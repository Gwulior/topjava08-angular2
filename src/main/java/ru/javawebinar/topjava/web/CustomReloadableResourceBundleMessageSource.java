package ru.javawebinar.topjava.web;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;
import java.util.Properties;

/**
 * Created by Dreval Viacheslav on 14.11.2016.
 */
public class CustomReloadableResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    public Properties getAllMessages(Locale locale) {
        PropertiesHolder mergedProperties = getMergedProperties(locale);
        return mergedProperties.getProperties();
    }

}
