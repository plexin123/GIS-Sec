package com.example.backendGIS.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "`group`")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String groupName;
    @Column
    private String description;
    @OneToMany(mappedBy = "group")
    private List<User> users;

    public Group() {
    }

    public Group(Long id, String groupName, String description, List<User> users) {
        this.id = id;
        this.groupName = groupName;
        this.description = description;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
