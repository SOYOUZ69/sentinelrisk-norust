package com.sentinelrisk.backend.config.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.hibernate.proxy.HibernateProxy;

import java.io.IOException;

/**
 * Sérialiseur personnalisé pour les proxies Hibernate.
 * Au lieu d'essayer de sérialiser toutes les propriétés d'un proxy Hibernate (ce qui peut causer des erreurs),
 * ce sérialiseur récupère l'identifiant et la classe sous-jacente et ne sérialise que ces informations.
 */
public class HibernateProxySerializer extends JsonSerializer<HibernateProxy> {

    @Override
    public void serialize(HibernateProxy proxy, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        Object implementationObject = proxy.getHibernateLazyInitializer().getImplementation();
        if (implementationObject == null) {
            // Si l'implémentation n'est pas disponible, sérialiser un objet vide avec l'ID
            gen.writeStartObject();
            gen.writeStringField("_entityName", proxy.getHibernateLazyInitializer().getEntityName());
            gen.writeObjectField("id", proxy.getHibernateLazyInitializer().getIdentifier());
            gen.writeStringField("_proxyInfo", "Non initialisé - seul l'ID est disponible");
            gen.writeEndObject();
        } else {
            // Si l'implémentation est disponible, la sérialiser normalement
            serializers.defaultSerializeValue(implementationObject, gen);
        }
    }
}
 