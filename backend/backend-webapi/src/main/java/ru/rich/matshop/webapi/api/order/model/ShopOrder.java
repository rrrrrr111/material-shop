package ru.rich.matshop.webapi.api.order.model;

import java.util.Date;
import java.util.List;

public class ShopOrder {

    private Long id;
    private Integer shopId;
    private Long clientPersonId;
    private Long addressId;
    private Long amount;
    private Long deliveryAmount;
    private ShopOrderDeliveryType deliveryType;
    private ShopOrderState state;
    private Long assignedPersonId;
    private String serviceComment;
    private Date createDate;
    private Date editDate;
    private List<ShopOrderGoods> shopOrderGoodsList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Long getClientPersonId() {
        return clientPersonId;
    }

    public void setClientPersonId(Long clientPersonId) {
        this.clientPersonId = clientPersonId;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
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

    public List<ShopOrderGoods> getShopOrderGoodsList() {
        return shopOrderGoodsList;
    }

    public void setShopOrderGoodsList(List<ShopOrderGoods> shopOrderGoodsList) {
        this.shopOrderGoodsList = shopOrderGoodsList;
    }

    @Override
    public String toString() {
        return "ShopOrder{" +
                "id=" + id +
                ", shopId=" + shopId +
                ", clientPersonId=" + clientPersonId +
                ", addressId=" + addressId +
                ", amount=" + amount +
                ", deliveryAmount=" + deliveryAmount +
                ", deliveryType=" + deliveryType +
                ", state=" + state +
                ", assignedPersonId=" + assignedPersonId +
                ", serviceComment='" + serviceComment + '\'' +
                ", createDate=" + createDate +
                ", editDate=" + editDate +
                ", shopOrderGoodsList=" + shopOrderGoodsList +
                '}';
    }
}
