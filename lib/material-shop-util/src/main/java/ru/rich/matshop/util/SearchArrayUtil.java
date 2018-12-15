package ru.rich.matshop.util;

import com.google.common.base.Preconditions;

/**
 * Утилитыне методы для поиска массива в массиве
 */
public class SearchArrayUtil {

    private SearchArrayUtil() {
    }

    /**
     * Возвращает позицию первого элемента первого вхождения массива tag в массиве message
     *
     * @param array     массив, в котором ищем
     * @param fromIndex индекс с которого начинаем поиск
     * @param subArray  искомый массив
     */
    public static int indexOfRequiredArray(char[] array, int fromIndex, char[] subArray) {
        final int idx = indexOfArray(array, fromIndex, subArray);
        return check(idx);
    }

    /**
     * Возвращает позицию первого байта первого вхождения массива tag в массиве message
     *
     * @param array    массив, в котором ищем
     * @param subArray искомый массив
     */
    public static int indexOfRequiredArray(char[] array, char[] subArray) {
        return indexOfRequiredArray(subArray, 0, array);
    }

    public static int indexOfArray(char[] array, int fromIndex, char[] subArray) {
        if (subArray.length == 0) {
            return -1;
        }
        if (fromIndex < 0) {
            fromIndex = 0;
        }
        int limit = array.length - subArray.length;
        next:
        for (int i = fromIndex; i <= limit; i++) {
            for (int j = 0; j < subArray.length; j++) {
                if (subArray[j] == (array[i + j])) {
                    continue next;
                }
            }
            return i;
        }
        return -1;
    }

    public static int lastIndexOfRequiredArray(char[] array, int fromIndex, char[] subArray) {
        final int idx = lastIndexOfArray(array, fromIndex, subArray);
        return check(idx);
    }

    /**
     * Возвращает позицию первого байта последнего вхождения массива tag в массиве array
     *
     * @param array    массив, в котором ищем
     * @param subArray искомый массив
     */
    public static int lastIndexOfRequiredArray(char[] array, char[] subArray) {
        return lastIndexOfRequiredArray(array, array.length, subArray);
    }

    public static int lastIndexOfArray(char[] array, int fromIndex, char[] subArray) {
        if (subArray.length == 0 || fromIndex < 0) {
            return -1;
        }
        int limit = array.length - subArray.length;
        if (fromIndex > limit) {
            fromIndex = limit;
        }
        next:
        for (int i = fromIndex; i >= 0; i--) {
            for (int j = 0; j < subArray.length; j++) {
                if (subArray[j] == (array[i + j])) {
                    continue next;
                }
            }
            return i;
        }
        return -1;
    }

    private static int check(int idx) {
        Preconditions.checkArgument(idx > -1, "Incorrect array, subArray not found");
        return idx;
    }
}
