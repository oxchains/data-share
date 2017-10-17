package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.Hospital;
import com.oxchains.mdsc.domain.Hospital1;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Luo_xuri on 2017/9/26.
 */
@Repository
public interface Hospital1Repo extends CrudRepository<Hospital1, Long> {

    Hospital findByRecordid(String recordId);
    List<Hospital> findByOwneridAndProviderid(String ownerid, String providerid);
    List<Hospital> findByOwnerid(String ownerid);
    Hospital findByRecordidAndOwnerid(String recordid, String ownerid);
    List<Hospital> findByProviderid(String providerid);
    Hospital findById(Long id);
    Hospital findByProvideridAndRecordid(String providerid, String recordid);
}
