package me.waterarchery.connectify;

import me.waterarchery.connectify.database.MySQL;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class Connectify {

	public static void main(String[] args) {
        MySQL.getInstance();
        SpringApplication.run(Connectify.class, args);
	}

    @GetMapping(path = "/author")
    public ResponseEntity<?> getAuthor() {
        return ResponseEntity.ok("1904180");
    }

}
