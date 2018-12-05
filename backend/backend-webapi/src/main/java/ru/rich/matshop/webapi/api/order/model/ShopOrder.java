package ru.rich.matshop.webapi.api.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
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
    @Null
    private Date createDate;
    @JsonIgnore
    private Date editDate;
    @NotEmpty
    private List<ShopOrderGoods> shopOrderGoodsList;

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

    public List<ShopOrderGoods> getShopOrderGoodsList() {
        return shopOrderGoodsList;
    }

    public void setShopOrderGoodsList(List<ShopOrderGoods> shopOrderGoodsList) {
        this.shopOrderGoodsList = shopOrderGoodsList;
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

    @Override
    public String toString() {
        return "ShopOrder{" +
                "id=" + id +
                ", shopIdentity=" + shopIdentity +
                ", clientPersonId=" + clientPersonId +
                ", personAddressId=" + personAddressId +
                ", deliveryAmount=" + deliveryAmount +
                ", goodsAmount=" + goodsAmount +
                ", totalAmount=" + totalAmount +
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
