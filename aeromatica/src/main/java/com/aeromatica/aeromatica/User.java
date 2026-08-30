package com.aeromatica.aeromatica;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String hash;

    public  User () {}

    public User(String name, String email, String hash) {
        this.name = name;
        this.email = email;
        this.hash = hash;
    }

    public Long getId() { return id;}
    public String getName() { return name;}
    public String getEmail() { return email; }
    public String getHash() { return hash; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setHash(String hash) { this.hash = hash; }
}
