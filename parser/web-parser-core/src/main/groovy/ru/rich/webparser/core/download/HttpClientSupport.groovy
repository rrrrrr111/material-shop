package ru.rich.webparser.core.download

import groovy.transform.CompileStatic
import groovy.transform.PackageScope
import org.apache.http.Header
import org.apache.http.HttpResponse
import org.apache.http.NoHttpResponseException
import org.apache.http.StatusLine
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.Configurable
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.client.methods.HttpRequestBase
import org.apache.http.client.methods.HttpUriRequest
import org.apache.http.config.SocketConfig
import org.apache.http.entity.ByteArrayEntity
import org.apache.http.impl.client.HttpClients
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

import javax.annotation.PostConstruct
import java.util.zip.GZIPInputStream

import static org.apache.commons.lang3.StringUtils.contains
import static ru.rich.matshop.util.ExceptionUtil.findExceptionOfType
import static ru.rich.matshop.util.ExceptionUtil.getAllErrorMessage

/**
 * Функции HTTP клиента
 * <p>
 * Часть функциональности скопирована из {@link org.springframework.remoting.httpinvoker.HttpComponentsHttpInvokerRequestExecutor}
 */
@Service
@CompileStatic
@PackageScope
class HttpClientSupport {
    private static final Logger log = LoggerFactory.getLogger(HttpClientSupport.class)

    private static final String HTTP_HEADER_ACCEPT_LANGUAGE = "Accept-Language"
    private static final String HTTP_HEADER_ACCEPT_ENCODING = "Accept-Encoding"
    private static final String HTTP_HEADER_CONTENT_ENCODING = "Content-Encoding"
    private static final String ENCODING_GZIP = "gzip"

    @Value('${webParser.httpClient.maxConnectionCount:100}')
    private Integer maxConnectionCount
    @Value('${webParser.httpClient.validateStaleConnectionAfterInactivityInMs:5000}')
    private Integer validateStaleConnectionAfterInactivityInMs
    @Value('${webParser.httpClient.acceptGzipEncoding:false}')
    private Boolean acceptGzipEncoding
    @Value('${webParser.httpClient.tryCount:3}')
    private Integer tryCount

    @Value('${webParser.httpClient.backlogSize:0}')
    private Integer backlogSize
    @Value('${webParser.httpClient.rcvBufSize:0}')
    private Integer rcvBufSize
    @Value('${webParser.httpClient.sndBufSize:0}')
    private Integer sndBufSize
    @Value('${webParser.httpClient.soKeepAlive:false}')
    private Boolean soKeepAlive
    @Value('${webParser.httpClient.soLinger:-1}')
    private Integer soLinger
    @Value('${webParser.httpClient.soReuseAddress:false}')
    private Boolean soReuseAddress
    @Value('${webParser.httpClient.soTimeout:0}')
    private Integer soTimeout
    @Value('${webParser.httpClient.tcpNoDelay:true}')
    private Boolean tcpNoDelay

    private HttpClient httpClient
    private Locale locale
    private final String contentType = "application/xml"

    @PostConstruct
    void init() {
        httpClient = prepareHttpClient()
        locale = new Locale.Builder().setLanguage("ru").setScript("Cyrl").build()

        log.info("initialisation: " +
                "maxConnectionCount={}, " +
                "validateStaleConnectionAfterInactivityInMs={}" +
                "acceptGzipEncoding={}" +
                "locale={}" +
                "tryCount={}",
                maxConnectionCount,
                validateStaleConnectionAfterInactivityInMs,
                acceptGzipEncoding,
                locale,
                tryCount
        )
    }

    private HttpClient prepareHttpClient() {

        SocketConfig config = SocketConfig.custom()
                .setBacklogSize(backlogSize)
                .setRcvBufSize(rcvBufSize)
                .setSndBufSize(sndBufSize)
                .setSoKeepAlive(soKeepAlive)
                .setSoLinger(soLinger)
                .setSoReuseAddress(soReuseAddress)
                .setSoTimeout(soTimeout)
                .setTcpNoDelay(tcpNoDelay)
                .build()
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager()
        cm.setDefaultSocketConfig(config)
        cm.setValidateAfterInactivity(validateStaleConnectionAfterInactivityInMs)
        cm.setMaxTotal(maxConnectionCount)
        cm.setDefaultMaxPerRoute(maxConnectionCount)

        return HttpClients.custom()
                .setConnectionManager(cm)
                .build()
    }

    def <T> T executePostMethod(String url,
                                byte[] requestByteArray,
                                ReadingResponseCallback<T> callback) throws IOException {

        for (int i = 1; ; i++) {

            ByteArrayEntity entity = new ByteArrayEntity(requestByteArray)
            entity.setContentType(contentType)

            HttpPost method = prepareMethod(new HttpPost(url))
            method.setEntity(entity)
            try {
                return execute(callback, method)

            } catch (IOException e) {

                if (isNotRecoverable(e) || allRecoveryAttemptsTried(i)) {
                    throw e
                }

                log.warn("Attempt {}: {} ", i, getAllErrorMessage(e))
            } finally {
                method.releaseConnection()
            }
        }
    }

    def <T> T executeGetMethod(String url, ReadingResponseCallback<T> callback) throws IOException {

        for (int i = 1; ; i++) {

            HttpGet method = prepareMethod(new HttpGet(url))
            try {
                return execute(callback, method)

            } catch (IOException e) {

                if (isNotRecoverable(e) || allRecoveryAttemptsTried(i)) {
                    throw e
                }

                log.warn("Attempt {}: {} ", i, getAllErrorMessage(e))
            } finally {
                method.releaseConnection()
            }
        }
    }

    private <T> T execute(ReadingResponseCallback<T> callback,
                          HttpUriRequest req) throws IOException {
        HttpResponse response = httpClient.execute(req)
        validateResponse(response)
        InputStream is = getResponseInputStream(response)
        return callback.read(is)
    }

    private <T extends HttpRequestBase> T prepareMethod(T method) {
        if (httpClient instanceof Configurable) {
            method.setConfig(((Configurable) httpClient).getConfig())
        }
        if (locale != null) {
            method.addHeader(HTTP_HEADER_ACCEPT_LANGUAGE, locale.toLanguageTag())
        }
        if (acceptGzipEncoding) {
            method.addHeader(HTTP_HEADER_ACCEPT_ENCODING, ENCODING_GZIP)
        }
        return method
    }

    private boolean isNotRecoverable(IOException e) {
        if (findExceptionOfType(e, SocketException.class) != null) {
            return false  // ошибка TCP соединения
        }
        NoHttpResponseException exception = findExceptionOfType(e, NoHttpResponseException.class)
        return exception == null || !contains(exception.getMessage(), "500")
    }

    private boolean allRecoveryAttemptsTried(int i) {
        return tryCount <= i
    }

    private static void validateResponse(HttpResponse response) throws IOException {

        StatusLine status = response.getStatusLine()
        if (status.getStatusCode() >= 300) {
            throw new NoHttpResponseException("Did not receive successful HTTP response: status code = " + status.getStatusCode() +
                    ", status message = [" + status.getReasonPhrase() + "]")
        }
    }

    private static InputStream getResponseInputStream(HttpResponse httpResponse) throws IOException {
        if (isGzipResponse(httpResponse)) {
            return new GZIPInputStream(httpResponse.getEntity().getContent())
        }
        return httpResponse.getEntity().getContent()
    }

    private static boolean isGzipResponse(HttpResponse httpResponse) {
        Header encodingHeader = httpResponse.getFirstHeader(HTTP_HEADER_CONTENT_ENCODING)
        return encodingHeader != null && encodingHeader.getValue() != null &&
                encodingHeader.getValue().toLowerCase().contains(ENCODING_GZIP)
    }

    /**
     * Колбек для чтения данных из потока ответа на HTTP запрос
     *
     * @param < T >    - читаемый тип
     */
    interface ReadingResponseCallback<T> {
        T read(InputStream response)
    }
}
