package me.waterarchery.connectify.routes.post;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import me.waterarchery.connectify.routes.user.User;
import me.waterarchery.connectify.routes.user.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class PostController {

    Gson gson = new Gson();

    @PostMapping(path = "/posts/own",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOwn(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        String token = (String) map.get("token");
        if (token != null) {
            User user = UserService.isValidToken(token);
            if (user != null) {
                List<Post> posts = PostService.getPosts(user.getId());
                return ResponseEntity.ok(gson.toJson(posts));
            }
            return ResponseEntity.badRequest().body("Invalid user");
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping(path = "/posts/explore",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getExplore(HttpServletRequest request) {
        List<Post> posts = PostService.getPosts();
        if (posts.size() < 20) {
            return ResponseEntity.badRequest().body(posts);
        }
        else {
            Random random = new Random();
            int finish = random.nextInt(posts.size() - 10) + 10;
            List<Post> explorePosts = posts.subList(0, finish);
            return ResponseEntity.badRequest().body(explorePosts);
        }
    }

    @PostMapping(path = "/posts/followed",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFollowedPosts(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        String token = (String) map.get("token");
        List<Post> posts = new ArrayList<>();
        if (token != null) {
            User user = UserService.isValidToken(token);
            if (user != null) {
                for (long userID : user.getFollowing()) {
                    posts.addAll(PostService.getPosts(userID));
                }
                posts.addAll(PostService.getPosts(user.getId()));
                posts.sort(Comparator.comparingLong(Post::getId));
                return ResponseEntity.ok(gson.toJson(posts));
            }
            return ResponseEntity.badRequest().body("Invalid user");
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping(path = "/posts/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        String token = (String) map.get("token");
        if (token != null) {
            User user = UserService.isValidToken(token);
            if (user != null) {
                String imageUrl = (String) map.get("image");
                String caption = (String) map.get("caption");
                if (imageUrl == null || caption == null)
                    return ResponseEntity.badRequest().body("Invalid caption or image");

                PostService.savePost(user.getId(), caption, imageUrl);
                return ResponseEntity.ok(gson.toJson("Post created"));
            }
            return ResponseEntity.badRequest().body("Invalid user");
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping(path = "/posts/delete",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        String token = (String) map.get("token");
        if (token != null) {
            User user = UserService.isValidToken(token);
            if (user != null) {
                long postID = map.get("postID") != null ? Long.parseLong(map.get("postID").toString()) : -1;
                if (postID == -1)
                    return ResponseEntity.badRequest().body("PostID is not exist");

                Optional<Post> post = PostService.getPost(postID);
                if (post.isPresent()) {
                    if (post.get().getAuthorName().equalsIgnoreCase(user.getUsername())) {
                        PostService.deletePost(postID, user.getId());
                        return ResponseEntity.ok(gson.toJson("Post deleted!"));
                    }
                    else {
                        return ResponseEntity.badRequest().body("You are not the owner of this post!");
                    }
                }
                else {
                    return ResponseEntity.badRequest().body("Invalid postID");
                }
            }
            return ResponseEntity.badRequest().body("Invalid user");
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }

}
