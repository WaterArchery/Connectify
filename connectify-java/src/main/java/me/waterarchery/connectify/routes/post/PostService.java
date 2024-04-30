package me.waterarchery.connectify.routes.post;

import me.waterarchery.connectify.database.MySQL;
import me.waterarchery.connectify.routes.like.LikeService;
import me.waterarchery.connectify.routes.user.User;
import me.waterarchery.connectify.routes.user.UserService;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PostService {

    public static List<Post> getPosts(long authorID) {
        List<Post> posts = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM posts WHERE user_id = " + "'" + authorID + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("id");
                    String content = resultSet.getString("body");
                    long author = resultSet.getLong("user_id");
                    String imageUrl = resultSet.getString("image_url");
                    Timestamp created = resultSet.getTimestamp("created_at");
                    Post post = new Post(id, author, content, imageUrl);
                    List<Long> likes = LikeService.getPostLikes(post.getId());
                    User user = UserService.getUsers("id", authorID).get(0);
                    if (user.getProfilePicture() != null)
                        post.setAuthorProfile(user.getProfilePicture());
                    post.setAuthorName(user.getUsername());
                    post.setCreatedAt(created);
                    post.setLikes(likes);
                    posts.add(post);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getPosts()");
            System.out.println("Query: " + query);
            System.out.println("Exception: " + ex.getMessage());
        }
        finally {
            try {
                if (conn != null) conn.close();
            }
            catch (SQLException ex) {
                System.out.println("Something is wrong in closing connection");
            }
        }

        return posts;
    }

    public static List<Post> getPosts() {
        List<Post> posts = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM posts;";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("id");
                    String content = resultSet.getString("body");
                    long author = resultSet.getLong("user_id");
                    String imageUrl = resultSet.getString("image_url");
                    Timestamp created = resultSet.getTimestamp("created_at");
                    Post post = new Post(id, author, content, imageUrl);
                    List<Long> likes = LikeService.getPostLikes(post.getId());
                    User user = UserService.getUsers("id", author).get(0);
                    if (user.getProfilePicture() != null)
                        post.setAuthorProfile(user.getProfilePicture());
                    post.setAuthorName(user.getUsername());
                    post.setCreatedAt(created);
                    post.setLikes(likes);
                    posts.add(post);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getPosts()");
            System.out.println("Query: " + query);
            System.out.println("Exception: " + ex.getMessage());
        }
        finally {
            try {
                if (conn != null) conn.close();
            }
            catch (SQLException ex) {
                System.out.println("Something is wrong in closing connection");
            }
        }

        return posts;
    }

    public static Optional<Post> getPost(long id) {
        Post post = null;
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM posts WHERE id = " + id + " LIMIT 1;";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    String content = resultSet.getString("body");
                    long author = resultSet.getLong("user_id");
                    String imageUrl = resultSet.getString("image_url");
                    Timestamp created = resultSet.getTimestamp("created_at");
                    post = new Post(id, author, content, imageUrl);
                    List<Long> likes = LikeService.getPostLikes(post.getId());
                    User user = UserService.getUsers("id", author).get(0);
                    if (user.getProfilePicture() != null)
                        post.setAuthorProfile(user.getProfilePicture());
                    post.setAuthorName(user.getUsername());
                    post.setCreatedAt(created);
                    post.setLikes(likes);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getPosts()");
            System.out.println("Query: " + query);
            System.out.println("Exception: " + ex.getMessage());
        }
        finally {
            try {
                if (conn != null) conn.close();
            }
            catch (SQLException ex) {
                System.out.println("Something is wrong in closing connection");
            }
        }

        return Optional.ofNullable(post);
    }

    public static void savePost(long authorID, String body, String url) {
        MySQL mySQL = MySQL.getInstance();
        Connection conn = mySQL.getConnection();
        try {
            String query = "INSERT INTO posts (user_id, body, image_url, created_at) VALUES (?, ?, ?, NOW())";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setLong(1, authorID);
            ps.setString(2, body);
            ps.setString(3, url);
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                if (conn != null) conn.close();
            }
            catch (SQLException ex) {
                System.out.println("Something is wrong in closing connection");
            }
        }
    }

    public static void deletePost(long id, long authorID) {
        MySQL mySQL = MySQL.getInstance();
        Connection conn = mySQL.getConnection();
        try {
            String query = "DELETE FROM posts WHERE id = " + id + " AND user_id = " + "'" + authorID + "';";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            try {
                if (conn != null) conn.close();
            }
            catch (SQLException ex) {
                System.out.println("Something is wrong in closing connection");
            }
        }
    }

}
