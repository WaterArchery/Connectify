package me.waterarchery.connectify.routes.like;

import jakarta.servlet.http.HttpServletRequest;
import me.waterarchery.connectify.routes.user.User;
import me.waterarchery.connectify.routes.user.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class LikeController {

    @PostMapping(path = "/like",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody Map<String, Object> map, HttpServletRequest request) {
        String token = (String) map.get("token");
        if (token != null) {
            User user = UserService.isValidToken(token);
            if (user != null) {
                long postID = map.get("postID") != null ? Long.parseLong(map.get("postID").toString()) : -1;
                if (postID != -1) {
                    List<Long> likes = LikeService.getPostLikes(postID);
                    if (likes.contains(user.getId())) {
                        LikeService.unlikePost(user.getId(), postID);
                    }
                    else {
                        LikeService.likePost(user.getId(), postID);
                    }
                    return ResponseEntity.ok().build();
                }
                else {
                    return ResponseEntity.badRequest().body("Invalid post ID");
                }
            }
            return ResponseEntity.badRequest().body("Invalid user");
        }

        return ResponseEntity.badRequest().body("Invalid token");
    }

}
