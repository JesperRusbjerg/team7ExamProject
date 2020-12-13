package com.soap;

public class SoapClient {


    public Float usdToDkkExchange(int amountToExchange){
        ExchangeService service = new ExchangeService();
        ExchangeServiceSoapPort executor = service.getExchangeServiceSoapPort();

        UsdToDkInput dku = new UsdToDkInput();
        dku.fromCurrency = "USD";
        dku.toCurrency = "DK";
        dku.amount = amountToExchange;


        UsdToDkOutput out = executor.usToDk(dku);

        Float num  = Float.parseFloat(out.result);

        return num;
    }

    public Float dkkToUsdExchange(int amountToExchange){
        ExchangeService service = new ExchangeService();
        ExchangeServiceSoapPort executor = service.getExchangeServiceSoapPort();

        DkToUsdInput dku = new DkToUsdInput();
        dku.fromCurrency = "USD";
        dku.toCurrency = "DK";
        dku.amount = amountToExchange;

        DkToUsdOutput out = executor.dkToUs(dku);

        Float num  = Float.parseFloat(out.result);

        return num;

    }

    public static void main(String[] args) {

        SoapClient soap = new SoapClient();

        System.out.println(soap.dkkToUsdExchange(319));

        System.out.println(soap.usdToDkkExchange(52));

    }


}