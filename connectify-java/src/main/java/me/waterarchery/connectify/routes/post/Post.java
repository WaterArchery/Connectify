package me.waterarchery.connectify.routes.post;

import java.sql.Timestamp;
import java.util.List;

public class Post {

    private long id;
    private final long userId;
    private final String imageUrl;
    private final String content;
    private Timestamp createdAt;
    private String authorName;
    private String authorProfile;
    private List<Long> likes;

    public Post(long id, long userId, String content, String imageUrl) {
        this.userId = userId;
        this.content = content;
        this.id = id;
        this.imageUrl = imageUrl;
    }

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getContent() {
        return content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getAuthorProfile() {
        return authorProfile;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setAuthorProfile(String authorProfile) {
        this.authorProfile = authorProfile;
    }

    public List<Long> getLikes() {
        return likes;
    }

    public void addLike(long userId) {
        likes.add(userId);
    }

    public void setLikes(List<Long> likes) {
        this.likes = likes;
    }
}
