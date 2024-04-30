package me.waterarchery.connectify.database;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.Nullable;

import java.sql.Connection;
import java.sql.SQLException;

public class MySQL {

    private static MySQL instance = null;

    public synchronized static MySQL getInstance() {
        if (instance == null) {
            instance = new MySQL();
        }
        return instance;
    }

    private MySQL() {
        initialize();
    }

    private static final HikariConfig config = new HikariConfig();
    private static HikariDataSource ds;

    private void initialize() {
        String url = "jdbc:mysql://" + DatabaseInfo.HOST + ":3306/" + DatabaseInfo.DATABASE;
        config.setJdbcUrl(url);
        config.addDataSourceProperty("useSSL",false);
        config.setUsername(DatabaseInfo.USER);
        config.setPassword(DatabaseInfo.PASSWORD);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.setConnectionTimeout(10000);
        config.setMaximumPoolSize(100);
        ds = new HikariDataSource( config );
    }

    public @Nullable Connection getConnection() {
        try {
            return ds.getConnection();
        }
        catch (SQLException exception) {
            exception.printStackTrace();
            return null;
        }
    }
}
