package me.waterarchery.connectify.routes.user;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class User {

    private final long id;
    private final String username;
    private final String password;
    private final String mail;
    private String token;
    private String profilePicture;
    private Timestamp createdAt;
    private List<Long> followers = new ArrayList<>();
    private List<Long> following = new ArrayList<>();

    public User(long id, String username, String password, String mail) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.mail = mail;
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getMail() {
        return mail;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<Long> getFollowers() {
        return followers;
    }

    public void setFollowers(List<Long> followers) {
        this.followers = followers;
    }

    public List<Long> getFollowing() {
        return following;
    }

    public void setFollowing(List<Long> following) {
        this.following = following;
    }
}
