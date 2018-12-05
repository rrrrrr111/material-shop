package ru.rich.matshop.webapi.api.user.model;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Objects;

public class PersonAddress {

    private Long id;
    private Long personId;
    @NotBlank
    private String region;
    private String town;
    @NotBlank
    private String street;
    @NotBlank
    private String house;
    private String housing;
    private String construction;
    private String apartment;
    private String entrance;
    private String intercom;
    private String addressComment;
    private Date editDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    public String getHousing() {
        return housing;
    }

    public void setHousing(String housing) {
        this.housing = housing;
    }

    public String getConstruction() {
        return construction;
    }

    public void setConstruction(String construction) {
        this.construction = construction;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public String getEntrance() {
        return entrance;
    }

    public void setEntrance(String entrance) {
        this.entrance = entrance;
    }

    public String getIntercom() {
        return intercom;
    }

    public void setIntercom(String intercom) {
        this.intercom = intercom;
    }

    public String getAddressComment() {
        return addressComment;
    }

    public void setAddressComment(String addressComment) {
        this.addressComment = addressComment;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    @Override
    public boolean equals(Object o) {
        PersonAddress that = (PersonAddress) o;
        return Objects.equals(region, that.region) &&
                Objects.equals(town, that.town) &&
                Objects.equals(street, that.street) &&
                Objects.equals(house, that.house) &&
                Objects.equals(housing, that.housing) &&
                Objects.equals(construction, that.construction) &&
                Objects.equals(apartment, that.apartment) &&
                Objects.equals(entrance, that.entrance) &&
                Objects.equals(intercom, that.intercom) &&
                Objects.equals(addressComment, that.addressComment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(region, town, street, house, housing, construction, apartment, entrance, intercom, addressComment);
    }

    @Override
    public String toString() {
        return "PersonAddress{" +
                "id=" + id +
                ", personId=" + personId +
                ", region='" + region + '\'' +
                ", town='" + town + '\'' +
                ", street='" + street + '\'' +
                ", house='" + house + '\'' +
                ", housing='" + housing + '\'' +
                ", construction='" + construction + '\'' +
                ", apartment='" + apartment + '\'' +
                ", entrance='" + entrance + '\'' +
                ", intercom='" + intercom + '\'' +
                ", addressComment='" + addressComment + '\'' +
                ", editDate=" + editDate +
                '}';
    }
}