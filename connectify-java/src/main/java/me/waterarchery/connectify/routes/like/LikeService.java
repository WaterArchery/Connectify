package me.waterarchery.connectify.routes.like;

import me.waterarchery.connectify.database.MySQL;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class LikeService {

    public static List<Long> getPostLikes(long postId) {
        List<Long> likes = new ArrayList<>();
        MySQL mySQL = MySQL.getInstance();
        String query = "SELECT * FROM likes WHERE post_id = " + "'" + postId + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();
            if (resultSet != null) {
                while (resultSet.next()) {
                    long userID = resultSet.getLong("user_id");
                    likes.add(userID);
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

        return likes;
    }

    public static void likePost(long authorID, long postID) {
        MySQL mySQL = MySQL.getInstance();
        String query = "INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, NOW())";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setLong(1, authorID);
            ps.setLong(2, postID);
            ps.executeUpdate();
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in likePost()");
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
    }

    public static void unlikePost(long authorID, long postID) {
        MySQL mySQL = MySQL.getInstance();
        String query = "DELETE FROM likes WHERE user_id = " + "'" + authorID + "' AND post_id = " + "'" + postID + "'";
        Connection conn = mySQL.getConnection();
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.executeUpdate();
        }
        catch (SQLException ex) {
            System.out.println("Something is wrong in unlikePost()");
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
    }

}
