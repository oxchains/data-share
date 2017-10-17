package com.oxchains.mdsc.rest;

import freemarker.template.SimpleDate;
import org.jruby.RubyProcess;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by Luo_xuri on 2017/10/13.
 */
public class TimePermissionTest {

    /**
     * 当医院搜索病例的时候，先判断有权限病历记录的有效时间
     * 如果有效时间已经过去了，就将permissionstatus改为0
     * 然后再进行别的操作
     *
     * 判断的条件：
     *          不是这条病历记录的就诊医院
     *          而是非病历记录创建医院查看的时候判断
     * */
    public static void main(String[] args){

        long currentTime = new Date().getTime(); // 毫秒值
        System.out.println("系统当前时间：" + currentTime);

        long validTime = new Date(2017,10,14).getTime();
        System.out.println("有效期时间为：" + validTime);

        // 剩余时间
        long finalTime = validTime - currentTime;

        if(finalTime > 0){
            System.out.println("有效时间还有：" + finalTime);
        }
    }
}
