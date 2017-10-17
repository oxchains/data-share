package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.UserToken;
import org.springframework.data.repository.CrudRepository;

/**
 * @author aiet
 */
public interface UserTokenRepo extends CrudRepository<UserToken, String> {
}
