package ru.rich.matshop.webapi.api.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class ShopOrder {

    @Null
    private Long id;
    @JsonIgnore
    private String shopIdentity;
    @Null
    private Long clientPersonId;
    @Null
    private Long personAddressId;
    @NotNull
    private Long goodsAmount;
    @NotNull
    private Long deliveryAmount;
    @NotNull
    private Long totalAmount;
    @NotNull
    private ShopOrderDeliveryType deliveryType;
    @Null
    private ShopOrderState state;
    @JsonIgnore
    private Long assignedPersonId;
    @JsonIgnore
    private String serviceComment;
    private String paymentInfo;
    @NotNull
    private ShopOrderPaymentType paymentType;
    @Null
    private Date createDate;
    @JsonIgnore
    private Date editDate;
    @Valid
    @NotEmpty
    private List<ShopOrderGoods> cartGoodsList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientPersonId() {
        return clientPersonId;
    }

    public void setClientPersonId(Long clientPersonId) {
        this.clientPersonId = clientPersonId;
    }

    public Long getPersonAddressId() {
        return personAddressId;
    }

    public void setPersonAddressId(Long personAddressId) {
        this.personAddressId = personAddressId;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getDeliveryAmount() {
        return deliveryAmount;
    }

    public void setDeliveryAmount(Long deliveryAmount) {
        this.deliveryAmount = deliveryAmount;
    }

    public ShopOrderDeliveryType getDeliveryType() {
        return deliveryType;
    }

    public void setDeliveryType(ShopOrderDeliveryType deliveryType) {
        this.deliveryType = deliveryType;
    }

    public ShopOrderState getState() {
        return state;
    }

    public void setState(ShopOrderState state) {
        this.state = state;
    }

    public Long getAssignedPersonId() {
        return assignedPersonId;
    }

    public void setAssignedPersonId(Long assignedPersonId) {
        this.assignedPersonId = assignedPersonId;
    }

    public String getServiceComment() {
        return serviceComment;
    }

    public void setServiceComment(String serviceComment) {
        this.serviceComment = serviceComment;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    public List<ShopOrderGoods> getCartGoodsList() {
        if (cartGoodsList == null) {
            return Collections.emptyList();
        }
        return cartGoodsList;
    }

    public void setCartGoodsList(List<ShopOrderGoods> cartGoodsList) {
        this.cartGoodsList = cartGoodsList;
    }

    public Long getGoodsAmount() {
        return goodsAmount;
    }

    public void setGoodsAmount(Long goodsAmount) {
        this.goodsAmount = goodsAmount;
    }

    public String getShopIdentity() {
        return shopIdentity;
    }

    public void setShopIdentity(String shopIdentity) {
        this.shopIdentity = shopIdentity;
    }

    public String getPaymentInfo() {
        return paymentInfo;
    }

    public void setPaymentInfo(String paymentInfo) {
        this.paymentInfo = paymentInfo;
    }

    public ShopOrderPaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(ShopOrderPaymentType paymentType) {
        this.paymentType = paymentType;
    }

    @Override
    public String toString() {
        return "ShopOrder{" +
                "id=" + id +
                ", shopIdentity='" + shopIdentity + '\'' +
                ", clientPersonId=" + clientPersonId +
                ", personAddressId=" + personAddressId +
                ", goodsAmount=" + goodsAmount +
                ", deliveryAmount=" + deliveryAmount +
                ", totalAmount=" + totalAmount +
                ", deliveryType=" + deliveryType +
                ", state=" + state +
                ", assignedPersonId=" + assignedPersonId +
                ", serviceComment='" + serviceComment + '\'' +
                ", paymentInfo='" + paymentInfo + '\'' +
                ", paymentType='" + paymentType + '\'' +
                ", createDate=" + createDate +
                ", editDate=" + editDate +
                ", cartGoodsList=" + cartGoodsList +
                '}';
    }
}
