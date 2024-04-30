package me.waterarchery.connectify.routes.user;

import me.waterarchery.connectify.database.MySQL;
import me.waterarchery.connectify.utils.Utils;

import java.sql.*;
import java.time.Instant;
import java.util.*;

public class UserService {

    public static List<User> getUsers(String paramater, Object value) {
        List<User> users = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM users WHERE " + paramater + " = " + "'" + value + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("id");
                    String username = resultSet.getString("username");
                    String password = resultSet.getString("password");
                    String mail = resultSet.getString("mail");
                    String token = resultSet.getString("token");
                    String profilePicture = resultSet.getString("profile_picture");
                    Timestamp created = resultSet.getTimestamp("created_at");
                    User user = new User(id, username, password, mail);
                    if (profilePicture != null)
                        user.setProfilePicture(profilePicture);

                    List<Long> followers = getUserFollowers(id);
                    List<Long> followed = getFollowedByUser(id);
                    user.setFollowers(followers);
                    user.setFollowing(followed);
                    user.setCreatedAt(created);
                    user.setToken(token);
                    users.add(user);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getResultSet()");
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

        return users;
    }

    public static List<Map<String, Object>> searchUsers(String name) {
        List<Map<String, Object>> users = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM users WHERE username LIKE '%" + name + "%'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("id");
                    String username = resultSet.getString("username");
                    String profilePicture = resultSet.getString("profile_picture");
                    Timestamp created = resultSet.getTimestamp("created_at");
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", id);
                    map.put("username", username);
                    map.put("profile_picture", profilePicture);
                    map.put("created_at", created);

                    List<Long> followers = getUserFollowers(id);
                    List<Long> followed = getFollowedByUser(id);
                    map.put("followers", followers);
                    map.put("followed", followed);
                    users.add(map);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getResultSet()");
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

        return users;
    }

    public static void followUser(User follower, User followed) {
        Connection conn = MySQL.getInstance().getConnection();
        try {
            if (follower.getFollowing().contains(followed.getId())) {
                String query = "DELETE FROM follows WHERE followed_user_id = '" + followed.getId() + "'"
                        + " AND following_user_id = '" + follower.getId() + "';";
                PreparedStatement ps = conn.prepareStatement(query);
                ps.executeUpdate();
            }
            else {
                String query = "INSERT INTO follows (following_user_id, followed_user_id , created_at) VALUES (?, ?, NOW())";
                PreparedStatement ps = conn.prepareStatement(query);
                ps.setLong(1, follower.getId());
                ps.setLong(2, followed.getId());
                ps.executeUpdate();
            }
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

    public static List<Long> getUserFollowers(long userID) {
        List<Long> users = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM follows WHERE followed_user_id = " + "'" + userID + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("following_user_id");
                    users.add(id);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getFollowers()");
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

        return users;
    }

    public static List<Long> getFollowedByUser(long userID) {
        List<Long> users = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM follows WHERE following_user_id = " + "'" + userID + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long id = resultSet.getLong("followed_user_id");
                    users.add(id);
                }
            }
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in getFollowers()");
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

        return users;
    }

    public static Optional<User> saveNewUser(User user) {
        MySQL mySQL = MySQL.getInstance();
        Connection conn = mySQL.getConnection();
        if (user.getUsername() == null || user.getPassword() == null || user.getMail() == null)
            return Optional.empty();
        try {
            String userToken = Utils.generateRandomString();
            String query = "INSERT INTO users (username, password, mail, token, profile_picture, created_at) VALUES (?, ?, ?, ?, ?, NOW())";

            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getMail());
            ps.setString(4, userToken);
            ps.setString(5, "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg");
            user.setToken(userToken);
            user.setCreatedAt(Timestamp.from(Instant.now()));
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

        return Optional.of(user);
    }

    public static void setProfilePicture(User user, String profilePicture) {
        MySQL mySQL = MySQL.getInstance();
        Connection conn = mySQL.getConnection();
        try {
            String query = "UPDATE users SET profile_picture = ? WHERE id = ?";
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, profilePicture);
            ps.setLong(2, user.getId());
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

    public static User isValidToken(String token) {
        List<User> users = getUsers("token", token);
        if (!users.isEmpty())
            return users.get(0);
        return null;
    }

}
