package com.quadrart.Storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

/*
 * Cria uma classe de propriedades do Storage, definindo por exemplo
 * o local onde essa pasta irá se localizar.
 */
@ConfigurationProperties("storage")
public class StorageProperties {
    
    @Value("${path.fileSystem}")
    private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location){
        this.location = location;
    }

}
