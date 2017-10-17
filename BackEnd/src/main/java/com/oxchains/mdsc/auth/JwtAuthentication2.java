package com.oxchains.mdsc.auth;

import com.oxchains.mdsc.domain.Research;
import com.oxchains.mdsc.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;

import static java.util.Collections.emptyList;

/**
 * Created by Luo_xuri on 2017/10/13.
 */
public class JwtAuthentication2 implements Authentication {

    private String token;
    private Research research;
    private Map<String, Object> details;

    JwtAuthentication2(Research research, String token, Map<String, Object> details) {
        this.research = research;
        this.token = token;
        this.details = details;
    }

    public Optional<Research> research(){return Optional.ofNullable(research);}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return emptyList();
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getDetails() {
        return details;
    }

    @Override
    public Object getPrincipal() {
        return research;
    }

    @Override
    public boolean isAuthenticated() {
        return research != null && research.getName() != null && research.getMobile() != null;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        if (!isAuthenticated) research = null;
    }

    @Override
    public String getName() {
        return research.getName();
    }

    @Override
    public String toString() {
        return token;
    }

}
