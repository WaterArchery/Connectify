package me.waterarchery.connectify;

import me.waterarchery.connectify.database.MySQL;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Connectify {

	public static void main(String[] args) {
        MySQL.getInstance();
        SpringApplication.run(Connectify.class, args);
	}

}
