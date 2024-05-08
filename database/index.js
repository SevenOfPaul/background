import Sequelize from "sequelize"
const sequelize = new Sequelize("english", "root", "xiaomi6x", { host: "localhost", port: 3306, dialect: "mysql", pool: { max: 5, min: 0, idle: 1000 } })
try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
} catch (error) {
    console.error('数据库连接失败', error);
}
export default sequelize 