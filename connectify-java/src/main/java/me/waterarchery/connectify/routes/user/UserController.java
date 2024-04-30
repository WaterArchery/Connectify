package me.waterarchery.connectify.routes.user;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import me.waterarchery.connectify.routes.post.Post;
import me.waterarchery.connectify.routes.post.PostService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    Gson gson = new Gson();

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getById(@PathVariable long id) {
        List<User> userList = UserService.getUsers("id", id);
        return userList.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(userList.get(0));
    }

    @PostMapping(path = "/users/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createUser(@RequestBody User newUser, HttpServletRequest request) {
        HashMap<String, String> responseMap = new HashMap<>();

        List<User> nameList = UserService.getUsers("username", newUser.getUsername());
        if (!nameList.isEmpty()) {
            responseMap.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(responseMap);
        }

        List<User> mailList = UserService.getUsers("mail", newUser.getMail());
        if (!mailList.isEmpty()) {
            responseMap.put("message", "Mail already exists");
            return ResponseEntity.badRequest().body(responseMap);
        }

        Optional<User> user = UserService.saveNewUser(newUser);
        if (user.isPresent()) {
            responseMap.put("message", "Post successfully created");
            responseMap.put("token", user.get().getToken());
        }
        else {
            responseMap.put("message", "Something went wrong!");
        }

        return ResponseEntity.badRequest().body(responseMap);
    }

    @PostMapping(path = "/users/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody User requestUser, HttpServletRequest request) {
        HashMap<String, String> responseMap = new HashMap<>();
        if (requestUser.getToken() == null) {
            List<User> nameList = UserService.getUsers("username", requestUser.getUsername());
            if (nameList.isEmpty()) {
                responseMap.put("message", "Username is not found");
                return ResponseEntity.badRequest().body(responseMap);
            }
            else {
                User user = nameList.get(0);
                String password = user.getPassword();
                if (requestUser.getPassword().equals(password)) {
                    responseMap.put("message", "Post successfully logged in");
                    responseMap.put("token", user.getToken());
                    responseMap.put("id", String.valueOf(user.getId()));
                    responseMap.put("username", user.getUsername());
                    responseMap.put("mail", user.getMail());
                    return ResponseEntity.ok(responseMap);
                }
                else {
                    responseMap.put("message", "Wrong password");
                    return ResponseEntity.badRequest().body(responseMap);
                }
            }
        }
        else {
            User user = UserService.isValidToken(requestUser.getToken());
            if (user != null) {
                responseMap.put("message", "Post successfully logged in");
                responseMap.put("token", user.getToken());
                responseMap.put("id", String.valueOf(user.getId()));
                responseMap.put("username", user.getUsername());
                responseMap.put("mail", user.getMail());
            }
            else {
                responseMap.put("message", "Invalid token");
            }
            return ResponseEntity.ok().body(responseMap);
        }
    }

    @PostMapping(path = "/users/follow",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> follow(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        User follower = UserService.isValidToken(map.get("followerToken").toString());
        if (follower == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }

        long followedId = Long.parseLong(map.get("followedID").toString());
        List<User> followedList = UserService.getUsers("id", followedId);

        if (followedList.isEmpty()) {
            return ResponseEntity.badRequest().body("Following user is not found");
        }

        User followed = followedList.get(0);
        UserService.followUser(follower, followed);

        return ResponseEntity.ok("Ok!");
    }

    @PostMapping(path = "/users/setpic",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> setProfilePicture(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        if (map.get("token") == null)
            return ResponseEntity.badRequest().body("Invalid token");

        User user = UserService.isValidToken(map.get("token").toString());
        if (user == null)
            return ResponseEntity.badRequest().body("Invalid token");

        String picture = map.get("picture").toString();
        UserService.setProfilePicture(user, picture);
        return ResponseEntity.ok("Ok!");
    }

    @GetMapping(path = "/users/search/{name}")
    public ResponseEntity<?> getBasicInfo(@PathVariable String name, HttpServletRequest request) {
        List<Map<String, Object>> users = UserService.searchUsers(name);
        return ResponseEntity.ok(users);
    }

    @GetMapping(path = "/users/profile/{username}")
    public ResponseEntity<?> getUserProfile(@PathVariable String username, HttpServletRequest request) {
        List<User> userList = UserService.getUsers("username", username);
        if (!userList.isEmpty()) {
            User user = userList.get(0);
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("id", user.getId());
            responseMap.put("username", user.getUsername());
            responseMap.put("profilePicture", user.getProfilePicture());
            responseMap.put("followers", user.getFollowers());
            responseMap.put("followings", user.getFollowing());
            responseMap.put("createdAt", user.getCreatedAt());

            List<Post> userPosts = PostService.getPosts(user.getId());
            responseMap.put("posts", userPosts);

            return ResponseEntity.ok(responseMap);
        }

        return ResponseEntity.notFound().build();
    }

}
