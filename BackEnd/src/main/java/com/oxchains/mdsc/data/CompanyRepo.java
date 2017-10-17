package com.oxchains.mdsc.data;


import com.oxchains.mdsc.domain.Company;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * @author Luo_xuri
 *
 * 医院，第三方医疗研究机构统称为公司
 */
public interface CompanyRepo extends CrudRepository<Company, Long> {

    Optional<Company> findByName(String name);

}
