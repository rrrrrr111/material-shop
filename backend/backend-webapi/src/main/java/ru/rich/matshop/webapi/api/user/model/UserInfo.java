package ru.rich.matshop.webapi.api.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class UserInfo extends Person implements UserDetails {

    @JsonIgnore
    private Date lastVisit;
    @JsonIgnore
    private boolean locked;
    @JsonIgnore
    private Role role;

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Date getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(Date lastVisit) {
        this.lastVisit = lastVisit;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAbilities();
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return getEmail();
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "id=" + getId() +
                ", email='" + getEmail() + '\'' +
                ", password=[SECURED]" +
                ", phone='" + getPhone() + '\'' +
                ", firstName='" + getFirstName() + '\'' +
                ", lastName='" + getLastName() + '\'' +
                ", dateOfBirth=" + getDateOfBirth() +
                ", sex='" + getSex() + '\'' +
                ", agreementChecked=" + getAgreementChecked() +
                ", locked=" + locked +
                ", role=" + role +
                ", editDate=" + getEditDate() +
                ", lastVisit=" + lastVisit +
                '}';
    }
}
