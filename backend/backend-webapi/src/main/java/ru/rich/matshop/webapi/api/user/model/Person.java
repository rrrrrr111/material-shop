package ru.rich.matshop.webapi.api.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import ru.rich.matshop.webapi.api.user.auth.validation.CurrentUserId;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnCreateOrder;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnSave;
import ru.rich.matshop.webapi.api.user.model.PersonValidation.OnSignup;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.function.Predicate;


public class Person {

    @Null(groups = {OnSignup.class})
    @NotNull(groups = {OnSave.class})
    @CurrentUserId(groups = {OnSave.class})
    private Long id;
    @NotBlank(groups = {OnSignup.class, OnSave.class, OnCreateOrder.class})
    @Email(groups = {OnSignup.class, OnSave.class, OnCreateOrder.class}, regexp = "^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,6}$")
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(groups = {OnSignup.class})
    private String password;
    @NotBlank(groups = {OnSave.class, OnCreateOrder.class})
    @Pattern(groups = {OnSave.class, OnCreateOrder.class}, regexp = "^\\d{10}$")
    private String phone;
    @NotBlank(groups = {OnSignup.class, OnSave.class, OnCreateOrder.class})
    private String firstName;
    @NotBlank(groups = {OnSave.class})
    private String lastName;
    private Date dateOfBirth;
    private Sex sex;
    @NotNull(groups = {OnSignup.class, OnCreateOrder.class})
    private Boolean agreementChecked;
    @JsonIgnore
    private Role role;
    @Null(groups = {OnSignup.class})
    @NotNull(groups = {OnSave.class})
    private Date editDate;
    @NotNull(groups = {OnCreateOrder.class})
    private PersonAddress address;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public Boolean getAgreementChecked() {
        return agreementChecked;
    }

    public void setAgreementChecked(Boolean agreementChecked) {
        this.agreementChecked = agreementChecked;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public PersonAddress getAddress() {
        if (address == null) {
            address = new PersonAddress();
        }
        return address;
    }

    public boolean ableTo(Predicate<Role> predicate) {
        return predicate.test(getRole());
    }

    public void setAddress(PersonAddress address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password=[HIDDEN]" +
                ", phone='" + phone + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", sex=" + sex +
                ", agreementChecked=" + agreementChecked +
                '}';
    }
}
