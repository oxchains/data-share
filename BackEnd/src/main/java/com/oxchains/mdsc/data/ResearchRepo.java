package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.Research;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * Created by Luo_xuri on 2017/10/12.
 */
public interface ResearchRepo extends CrudRepository<Research, Long> {

    Optional<Research> findByNameAndPassword(String name, String password);
    Optional<Research> findByName(String name);
}
