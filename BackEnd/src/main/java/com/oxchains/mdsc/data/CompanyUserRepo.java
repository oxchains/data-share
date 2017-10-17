package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.CompanyUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author Luo_xuri
 *
 * 医院，第三方医疗研究机构统称为公司
 *
 */
public interface CompanyUserRepo extends CrudRepository<CompanyUser, Long>{

    Optional<CompanyUser> findByName(String name);

    Optional<CompanyUser> findByNameAndPassword(String name, String password);


}
