package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author Luo_xuri
 */
public interface UserRepo extends CrudRepository<User, String> {

    Optional<User> findByNameAndPassword(String username, String password);

    Optional<User> findByName(String username);

}
