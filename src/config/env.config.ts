/**
 * EnvConfiguration
 * Método para mapear variables de entorno y retorna un objeto para 
 * que lo utilice app.module en ConfigModule.forRoot().
 * 
 * Sintaxis
 * export const EnvConfiguration = () => ({})
 * Es igual a
 * export const EnvConfiguration = () => {
 *  return {}
 * }
 * 
 */
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev', // Declarar entorno
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    default_limit: process.env.DEFAULT_LIMIT || 7,
});