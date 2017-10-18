package com.oxchains.mdsc.data;

import com.oxchains.mdsc.domain.Status;
import com.sun.jna.platform.win32.WinBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Luo_xuri on 2017/9/26.
 */
@Repository
public interface StatusRepo extends CrudRepository<Status, Long> {

    List<Status> findByRecordid(String recordid);
    Status findByUseridAndRecordid(String loginname, String recordid);
}
