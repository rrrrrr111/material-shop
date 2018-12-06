package ru.rich.matshop.webapi.api.order.model;

public class ShopOrderInfo extends ShopOrder {

    private String personAddress;

    public String getPersonAddress() {
        return personAddress;
    }

    public void setPersonAddress(String personAddress) {
        this.personAddress = personAddress;
    }

    @Override
    public String toString() {
        return "ShopOrder{" +
                "id=" + getId() +
                ", shopIdentity='" + getShopIdentity() + '\'' +
                ", clientPersonId=" + getClientPersonId() +
                ", personAddressId=" + getPersonAddressId() +
                ", personAddress=" + personAddress +
                ", goodsAmount=" + getGoodsAmount() +
                ", deliveryAmount=" + getDeliveryAmount() +
                ", totalAmount=" + getTotalAmount() +
                ", deliveryType=" + getDeliveryType() +
                ", state=" + getState() +
                ", assignedPersonId=" + getAssignedPersonId() +
                ", serviceComment='" + getServiceComment() + '\'' +
                ", paymentInfo='" + getPaymentInfo() + '\'' +
                ", paymentType='" + getPaymentType() + '\'' +
                ", createDate=" + getCreateDate() +
                ", editDate=" + getEditDate() +
                ", cartGoodsList=" + getCartGoodsList() +
                '}';
    }
}