package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.Hospital;
import com.oxchains.mdsc.domain.RecordDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Luo_xuri on 2017/9/26.
 */
@Repository
public interface RecordDetailsRepo extends CrudRepository<RecordDetails, Long> {


}
