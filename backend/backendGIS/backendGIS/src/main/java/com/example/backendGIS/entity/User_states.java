package com.example.backendGIS.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDeleteAction;

public class User_states {

    @Id
    @Column(name = "user_id")
    private Long userId;


    @OneToOne
    @MapsId
//    @JoinColumn(name = "user_id", referencedColumnName = "id", onDelete = OnDeleteAction.CASCADE)
    private User user;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
