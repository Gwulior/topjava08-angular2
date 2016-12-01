package ru.javawebinar.topjava.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;
import java.util.Properties;

/**
 * Created by Dreval Viacheslav on 14.11.2016.
 */
public class CustomReloadableResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    private static final Logger log = LoggerFactory.getLogger(CustomReloadableResourceBundleMessageSource.class);

    public Properties getAllMessages(Locale locale) {
        log.warn("t_start");
        log.warn(System.getenv("TOPJAVA_ROOT"));
        log.warn(System.getenv("IPADDR"));
        log.warn(this.toString());
        log.warn("t_end");

        PropertiesHolder mergedProperties = getMergedProperties(locale);
        return mergedProperties.getProperties();
    }

}
