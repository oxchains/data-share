package com.oxchains.mdsc.domain;

public class PatientData {
    private String Item;
    private boolean Flag=false;
    private int Ingegral;

    public PatientData(String item, boolean flag, int ingegral) {
        Item = item;
        Flag = flag;
        Ingegral = ingegral;
    }

    public String getItem() {
        return Item;
    }

    public void setItem(String item) {
        Item = item;
    }

    public boolean isFlag() {
        return Flag;
    }

    public void setFlag(boolean flag) {
        Flag = flag;
    }

    public int getIngegral() {
        return Ingegral;
    }

    public void setIngegral(int ingegral) {
        Ingegral = ingegral;
    }
}
