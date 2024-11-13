package com.example.backendGIS.dto;

import javax.swing.*;

public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private Long groupId;  // Only include the group ID, not the full object

    public UserDTO(Long id, String username, String password,Long groupId) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.groupId = groupId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }
}
