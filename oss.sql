/*
 Navicat Premium Data Transfer

 Source Server         : phpMySql
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : localhost:3306
 Source Schema         : oss

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 14/08/2019 09:29:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for appraisal
-- ----------------------------
DROP TABLE IF EXISTS `appraisal`;
CREATE TABLE `appraisal`  (
  `id` int(4) NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `yearMonth` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value111` int(4) NOT NULL,
  `value112` int(4) NOT NULL,
  `value113` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value121` int(4) NOT NULL,
  `value122` int(4) NOT NULL,
  `value123` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value131` int(4) NOT NULL,
  `value132` int(4) NOT NULL,
  `value133` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value141` int(4) NOT NULL,
  `value142` int(4) NOT NULL,
  `value143` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value151` int(4) NOT NULL,
  `value152` int(4) NOT NULL,
  `value153` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value211` int(4) NOT NULL,
  `value212` int(4) NOT NULL,
  `value213` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value221` int(4) NOT NULL,
  `value222` int(4) NOT NULL,
  `value223` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value231` int(4) NOT NULL,
  `value232` int(4) NOT NULL,
  `value233` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value241` int(4) NOT NULL,
  `value242` int(4) NOT NULL,
  `value243` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value251` int(4) NOT NULL,
  `value252` int(4) NOT NULL,
  `value253` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value311` int(4) NOT NULL,
  `value312` int(4) NOT NULL,
  `value313` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value321` int(4) NOT NULL,
  `value322` int(4) NOT NULL,
  `value323` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value331` int(4) NOT NULL,
  `value332` int(4) NOT NULL,
  `value333` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value341` int(4) NOT NULL,
  `value342` int(4) NOT NULL,
  `value343` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value351` int(4) NOT NULL,
  `value352` int(4) NOT NULL,
  `value353` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value411` int(4) NOT NULL,
  `value412` int(4) NOT NULL,
  `value413` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value421` int(4) NOT NULL,
  `value422` int(4) NOT NULL,
  `value423` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value431` int(4) NOT NULL,
  `value432` int(4) NOT NULL,
  `value433` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value441` int(4) NOT NULL,
  `value442` int(4) NOT NULL,
  `value443` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value451` int(4) NOT NULL,
  `value452` int(4) NOT NULL,
  `value453` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `value51` int(4) NOT NULL,
  `value52` int(4) NOT NULL,
  `value53` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of appraisal
-- ----------------------------
INSERT INTO `appraisal` VALUES (111, '佐助', '2019.12', 2, 222, '优秀   ', 8, 7, '良好', 6, 8, '及格', 7, 6, '良好', 20, 21, '优秀', 11, 12, '#', 13, 14, '#', 15, 16, '#', 17, 18, '#', 19, 20, '#', 21, 22, '#', 23, 24, '#', 25, 26, '#', 27, 28, '#', 29, 30, '#', 31, 32, '#', 33, 34, '#', 35, 36, '#', 37, 38, '#', 39, 40, '#', 41, 42, '#');
INSERT INTO `appraisal` VALUES (111, '佐助', '2019.11', 123, 2, '#', 3, 4, '#', 5, 6, '#', 7, 8, '#', 9, 10, '#', 11, 12, '#', 13, 14, '#', 15, 16, '#', 17, 18, '#', 19, 20, '#', 21, 22, '#', 23, 24, '#', 25, 26, '#', 27, 28, '#', 29, 30, '#', 31, 32, '#', 33, 34, '#', 35, 35, '#', 35, 38, '#', 39, 40, '#', 41, 42, '#');
INSERT INTO `appraisal` VALUES (112, '鸣人', '2019.12', 55, 2, '0', 3, 4, '0', 5, 6, '0', 7, 8, '0', 9, 10, '0', 11, 12, '0', 13, 14, '0', 15, 16, '0', 17, 18, '0', 19, 20, '0', 21, 22, '0', 23, 24, '0', 25, 26, '0', 27, 28, '0', 29, 30, '0', 31, 32, '0', 33, 34, '0', 35, 36, '0', 37, 38, '0', 39, 40, '0', 41, 42, '0');
INSERT INTO `appraisal` VALUES (112, '鸣人', '2019.11', 44, 2, '0', 3, 4, '0', 5, 6, '0', 7, 8, '0', 9, 10, '0', 11, 12, '0', 10, 9, '0', 8, 7, '0', 6, 5, '0', 4, 3, '0', 2, 1, '0', 3, 4, '0', 5, 6, '0', 7, 8, '0', 3, 4, '0', 1, 2, '0', 3, 4, '0', 5, 6, '0', 2, 3, '0', 7, 8, '0', 2, 3, '0');
INSERT INTO `appraisal` VALUES (113, '小樱', '2019.12', 123, 213, '1', 11, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1', 1, 1, '1');
INSERT INTO `appraisal` VALUES (113, '小樱', '2019.11', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2', 2, 2, '2');
INSERT INTO `appraisal` VALUES (112, '鸣人', '2019.10', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3', 3, 3, '3');
INSERT INTO `appraisal` VALUES (113, '小樱', '2019.8', 1, 1, '1', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#');
INSERT INTO `appraisal` VALUES (113, '小樱', '2019.7', 2312, 312, '231', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#');
INSERT INTO `appraisal` VALUES (113, '小樱', '2019.6', 1, 1, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#');
INSERT INTO `appraisal` VALUES (114, '卡卡西', '2019.12', 1, 1, '好', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#', 999, 999, '#');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` int(4) NOT NULL,
  `pId` int(4) NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `open` tinyint(1) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, 0, '客服调度服务中心', 1);
INSERT INTO `department` VALUES (11, 1, '班组1', 1);
INSERT INTO `department` VALUES (111, 11, '佐助', 0);
INSERT INTO `department` VALUES (112, 11, '鸣人', 0);
INSERT INTO `department` VALUES (113, 11, '小樱', 0);
INSERT INTO `department` VALUES (114, 11, '卡卡西', 0);
INSERT INTO `department` VALUES (12, 1, '班组2', 1);
INSERT INTO `department` VALUES (121, 12, '鹿丸', 0);
INSERT INTO `department` VALUES (122, 12, '井野', 0);
INSERT INTO `department` VALUES (123, 12, '丁次', 0);
INSERT INTO `department` VALUES (124, 12, '阿斯玛', 0);
INSERT INTO `department` VALUES (13, 1, '班组3', 1);
INSERT INTO `department` VALUES (131, 13, '小李', 0);
INSERT INTO `department` VALUES (132, 13, '天天', 0);
INSERT INTO `department` VALUES (2, 0, '企信部', 1);
INSERT INTO `department` VALUES (21, 2, '班组1', 1);
INSERT INTO `department` VALUES (211, 21, '犬冢牙', 0);
INSERT INTO `department` VALUES (212, 21, '雏田', 0);
INSERT INTO `department` VALUES (213, 21, '志乃', 0);
INSERT INTO `department` VALUES (214, 21, '红', 0);
INSERT INTO `department` VALUES (22, 2, '班组2', 0);
INSERT INTO `department` VALUES (221, 22, '角度', 0);
INSERT INTO `department` VALUES (222, 22, '飞段', 0);
INSERT INTO `department` VALUES (223, 22, '赤沙之蝎', 0);
INSERT INTO `department` VALUES (224, 22, '迪达拉', 0);
INSERT INTO `department` VALUES (23, 2, '班组3', 0);
INSERT INTO `department` VALUES (231, 23, '自来也', 0);
INSERT INTO `department` VALUES (232, 23, '大蛇丸', 0);
INSERT INTO `department` VALUES (233, 23, '纲手', 0);
INSERT INTO `department` VALUES (234, 23, '袁飞', 0);

-- ----------------------------
-- Table structure for oss_archivesmanagementtable
-- ----------------------------
DROP TABLE IF EXISTS `oss_archivesmanagementtable`;
CREATE TABLE `oss_archivesmanagementtable`  (
  `id` int(20) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `personIDNum` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(5) NULL DEFAULT NULL,
  `phoneNum` int(20) NULL DEFAULT NULL,
  `jobNum` int(20) NULL DEFAULT NULL,
  `jobPosition` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `school` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `familyAdd_province` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `familyAdd_city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `eduBackground` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nativePlace_province` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nativePlace_city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `politicsBackground` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entryTime` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `photo` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oss_archivesmanagementtable
-- ----------------------------
INSERT INTO `oss_archivesmanagementtable` VALUES (1001, '佐助', '1123456', 1, 22220111, 110001, '前端工程师', '江南大学', '江苏省', '无锡市', '硕士', '山东省', '菏泽市', '共青团员', '2018-08-08', '1565745942.jpeg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1002, '鸣人', '23333', 1, 1234567890, 110002, '前端工程师', '东南大学', '江苏省', '南京市', '硕士', '湖北省', '武汉市', '党员', '2016-08-08', '1565686546.jpg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1003, '小樱', '33333333', 0, 3333333, 110003, '前端工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-08-08', '1565685103.jpeg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1004, '卡卡西', '4444444444', 1, 444444444, 110004, '后端工程师', '河海大学', '浙江省', '杭州市', '本科', '湖北省', '武汉市', '党员', '2015-08-08', '1565685112.jpg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1005, '鹿丸', '66666666', 1, 666666666, 110005, '前端工程师', '浙江大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2013-08-08', '1565685121.jpeg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1006, '井野', '77777777777', 0, 2147483647, 110006, '算法工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-08-08', '1565685133.png');
INSERT INTO `oss_archivesmanagementtable` VALUES (1007, '丁次', '888888888', 1, 888888888, 110007, '前端工程师', '复旦大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-08-08', '1565685142.jpg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1008, '阿斯玛', '999999999', 1, 999999999, 110008, '前端工程师', '南京大学', '江苏省', '徐州市', '本科', '湖北省', '武汉市', '群众', '2017-08-08', '1565685150.jpg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1009, '小李', '1212121212', 1, 1212121212, 110009, '前端工程师', '南京大学', '江苏省', '扬州市', '本科', '甘肃省', '兰州市', '群众', '2017-8-8', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1010, '天天', '131313131313', 0, 13131313, 110010, '架构师', '兰州大学', '湖南省', '长沙市', '硕士', '河南省', '郑州市', '党员', '2017-08-08', '1565685159.jpg');
INSERT INTO `oss_archivesmanagementtable` VALUES (1011, '宁次', '14141414141', 1, 2147483647, 110011, '实习生', '河海大学', '江苏省', '常州市', '本科', '云南省', '昆明市', '共青团员', '2017-08-08', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1012, '犬冢牙', '15151515', 1, 15151515, 110012, '实习生', '湖南大学', '江苏省', '无锡市', '本科', '江苏省', '无锡市', '团员', '2017-8-8', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1013, '雏田', '16161616', 0, 16161616, 110013, '实习生', '江南大学', '江苏省', '无锡市', '本科', '江苏省', '无锡市', '团员', '2017-8-8', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1014, '志乃', '171717171', 1, 171717171, 110014, '算法工程师', '苏州大学', '江苏省', '苏州市', '本科', '江苏省', '苏州市', '团员', '2010-8-8', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1015, '红', '18181818', 0, 18181818, 110015, '前端工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '十堰市', '团员', '2017-8-8', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1016, '角都', '1111', 1, 11111, 110016, '前端工程师', '江南大学', '安徽省', '六安市', '硕士', '浙江省', '绍兴市', '党员', '2019-08-14', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1017, '飞段', '1456246614', 1, 2147483647, 110017, '前端工程师', '江南大学', '江苏省', '无锡市', '本科', '河南省', '郑州市', '共青团员', '2019-08-14', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1018, '赤砂之蝎', '34562421', 1, 2147483647, 110018, '前端工程师', '江南大学', '浙江省', '舟山市', '本科', '安徽省', '黄山市', '党员', '2019-08-20', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1019, '迪达拉', '45673562', 1, 2147483647, 110019, '前端工程师', '南京大学', '福建省', '泉州市', '硕士', '福建省', '三明市', '党员', '2019-08-20', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1020, '自来也', '67835454', 1, 2147483647, 110020, '前端工程师', '北京大学', '江苏省', '南通市', '硕士', '江苏省', '泰州市', '党员', '2019-07-09', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1021, '大蛇丸', '34341341', 1, 2147483647, 110021, '前端工程师', '华中科技大学', '湖南省', '郴州市', '硕士', '福建省', '莆田市', '党员', '2018-08-08', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1022, '纲手', '565656245', 0, 2147483647, 110022, '前端工程师', '北京大学', '湖北省', '荆州市', '硕士', '福建省', '三明市', '党员', '2019-08-05', NULL);
INSERT INTO `oss_archivesmanagementtable` VALUES (1023, '水门', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for oss_archivesmanagementtable_copy1
-- ----------------------------
DROP TABLE IF EXISTS `oss_archivesmanagementtable_copy1`;
CREATE TABLE `oss_archivesmanagementtable_copy1`  (
  `id` int(20) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `personIDNum` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` int(5) NULL DEFAULT NULL,
  `phoneNum` int(20) NULL DEFAULT NULL,
  `jobNum` int(20) NULL DEFAULT NULL,
  `jobPosition` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `school` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `familyAdd_province` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `familyAdd_city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `eduBackground` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nativePlace_province` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nativePlace_city` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `politicsBackground` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entryTime` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oss_archivesmanagementtable_copy1
-- ----------------------------
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1001, '佐助', '1123456', 1, 22220111, 110001, '前端工程师', '江南大学', '江苏省', '无锡市', '硕士', '山东省', '菏泽市', '共青团员', '2018-08-08');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1002, '鸣人', '23333', 1, 1234567890, 110002, '前端工程师', '东南大学', '江苏省', '南京市', '硕士', '湖北省', '武汉市', '党员', '2016-08-08');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1003, '小樱', '33333333', 0, 3333333, 110003, '前端工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1004, '卡卡西', '4444444444', 1, 444444444, 110004, '后端工程师', '河海大学', '浙江省', '杭州市', '本科', '湖北省', '武汉市', '党员', '2015-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1005, '鹿丸', '66666666', 1, 666666666, 110005, '前端工程师', '浙江大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2013-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1006, '井野', '77777777777', 0, 2147483647, 110006, '算法工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1007, '丁次', '888888888', 1, 888888888, 110007, '前端工程师', '复旦大学', '江苏省', '南京市', '本科', '湖北省', '武汉市', '党员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1008, '阿斯玛', '999999999', 1, 999999999, 110008, '前端工程师', '南京大学', '江苏省', '徐州市', '本科', '湖北省', '武汉市', '群众', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1009, '小李', '1212121212', 1, 1212121212, 110009, '前端工程师', '南京大学', '江苏省', '扬州市', '本科', '甘肃省', '兰州市', '群众', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1010, '天天', '131313131313', 0, 13131313, 110010, '架构师', '兰州大学', '湖南省', '长沙市', '硕士', '河南省', '郑州市', '党员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1011, '宁次', '14141414141', 1, 2147483647, 0, '实习生', '河海大学', '江苏省', '常州市', '本科', '云南省', '昆明市', '共青团员', '2017-08-08');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1012, '犬冢牙', '15151515', 1, 15151515, 110012, '实习生', '湖南大学', '江苏省', '无锡市', '本科', '江苏省', '无锡市', '团员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1013, '雏田', '16161616', 0, 16161616, 110013, '实习生', '江南大学', '江苏省', '无锡市', '本科', '江苏省', '无锡市', '团员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1014, '志乃', '171717171', 1, 171717171, 110014, '算法工程师', '苏州大学', '江苏省', '苏州市', '本科', '江苏省', '苏州市', '团员', '2010-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1015, '红', '18181818', 0, 18181818, 110015, '前端工程师', '南京大学', '江苏省', '南京市', '本科', '湖北省', '十堰市', '团员', '2017-8-8');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1016, '角都', '1111', 1, 11111, 110016, '前端工程师', '江南大学', '安徽省', '六安市', '硕士', '浙江省', '绍兴市', '党员', '2019-08-14');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1017, '飞段', '1456246614', 1, 2147483647, 110017, '前端工程师', '江南大学', '江苏省', '无锡市', '本科', '河南省', '郑州市', '共青团员', '2019-08-14');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1018, '赤砂之蝎', '34562421', 1, 2147483647, 110018, '前端工程师', '江南大学', '浙江省', '舟山市', '本科', '安徽省', '黄山市', '党员', '2019-08-20');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1019, '迪达拉', '45673562', 1, 2147483647, 110019, '前端工程师', '南京大学', '福建省', '泉州市', '硕士', '福建省', '三明市', '党员', '2019-08-20');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1020, '自来也', '67835454', 1, 2147483647, 110020, '前端工程师', '北京大学', '江苏省', '南通市', '硕士', '江苏省', '泰州市', '党员', '2019-07-09');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1021, '大蛇丸', '34341341', 1, 2147483647, 110021, '前端工程师', '华中科技大学', '湖南省', '郴州市', '硕士', '福建省', '莆田市', '党员', '2018-08-08');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1022, '纲手', '565656245', 0, 2147483647, 110022, '前端工程师', '北京大学', '湖北省', '荆州市', '硕士', '福建省', '三明市', '党员', '2019-08-05');
INSERT INTO `oss_archivesmanagementtable_copy1` VALUES (1023, '水门', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for oss_depart
-- ----------------------------
DROP TABLE IF EXISTS `oss_depart`;
CREATE TABLE `oss_depart`  (
  `id` int(20) NOT NULL,
  `deptId` int(30) NOT NULL,
  `deptPid` int(30) NULL DEFAULT NULL,
  `deptName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `isOpen` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oss_depart
-- ----------------------------
INSERT INTO `oss_depart` VALUES (0, 1, 0, '客服调度服务中心', 'true');
INSERT INTO `oss_depart` VALUES (0, 2, 0, '企信部', 'false');
INSERT INTO `oss_depart` VALUES (0, 3, 0, '云计算中心', 'false');
INSERT INTO `oss_depart` VALUES (1, 11, 1, '班组1', 'false');
INSERT INTO `oss_depart` VALUES (1, 12, 1, '班组2', 'false');
INSERT INTO `oss_depart` VALUES (1, 13, 1, '班组3', 'false');
INSERT INTO `oss_depart` VALUES (1, 21, 2, '班组1', 'false');
INSERT INTO `oss_depart` VALUES (1, 22, 2, '班组2', 'false');
INSERT INTO `oss_depart` VALUES (1, 23, 2, '班组3', 'false');
INSERT INTO `oss_depart` VALUES (1001, 111, 11, '佐助', 'false');
INSERT INTO `oss_depart` VALUES (1002, 112, 11, '鸣人', 'false');
INSERT INTO `oss_depart` VALUES (1003, 113, 11, '小樱', 'false');
INSERT INTO `oss_depart` VALUES (1004, 114, 11, '卡卡西', 'false');
INSERT INTO `oss_depart` VALUES (1005, 121, 12, '鹿丸', 'false');
INSERT INTO `oss_depart` VALUES (1006, 122, 12, '井野', 'false');
INSERT INTO `oss_depart` VALUES (1007, 123, 12, '丁次', 'false');
INSERT INTO `oss_depart` VALUES (1008, 124, 12, '阿斯玛', 'false');
INSERT INTO `oss_depart` VALUES (1009, 131, 13, '小李', 'false');
INSERT INTO `oss_depart` VALUES (1010, 132, 13, '天天', 'false');
INSERT INTO `oss_depart` VALUES (1011, 133, 13, '宁次', 'false');
INSERT INTO `oss_depart` VALUES (1012, 211, 21, '犬冢牙', 'false');
INSERT INTO `oss_depart` VALUES (1013, 212, 21, '雏田', 'false');
INSERT INTO `oss_depart` VALUES (1014, 213, 21, '志乃', 'false');
INSERT INTO `oss_depart` VALUES (1015, 214, 21, '红', 'false');
INSERT INTO `oss_depart` VALUES (1016, 221, 22, '角都', 'false');
INSERT INTO `oss_depart` VALUES (1017, 222, 22, '飞段', 'false');
INSERT INTO `oss_depart` VALUES (1018, 223, 22, '赤砂之蝎', 'false');
INSERT INTO `oss_depart` VALUES (1019, 224, 22, '迪达拉', 'false');
INSERT INTO `oss_depart` VALUES (1020, 231, 23, '自来也', 'false');
INSERT INTO `oss_depart` VALUES (1021, 232, 23, '大蛇丸', 'false');
INSERT INTO `oss_depart` VALUES (1022, 233, 23, '纲手', 'false');
INSERT INTO `oss_depart` VALUES (1023, 1565342564, 23, '水门', 'false');

-- ----------------------------
-- Table structure for oss_logintable
-- ----------------------------
DROP TABLE IF EXISTS `oss_logintable`;
CREATE TABLE `oss_logintable`  (
  `id` int(15) NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `passWord` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `salt` int(20) NULL DEFAULT NULL,
  `regtime` int(20) NULL DEFAULT NULL,
  `status` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oss_logintable
-- ----------------------------
INSERT INTO `oss_logintable` VALUES (1001, '佐助', 'ab76db0b69ace3caebe3396ef798ab43', 1565093279, 1565093125, 1);
INSERT INTO `oss_logintable` VALUES (1002, '鸣人', 'e35aafe5a2e318e7cfa6a9ac3233c574', 1565096019, 1565093279, 1);
INSERT INTO `oss_logintable` VALUES (1003, '小樱', '6ee22a90c15bec9e1660007345bcdf67', 1565138912, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1004, '卡卡西', '39220b9cd6e0cfb18fededdc49f86d87', 1565138967, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1005, '鹿丸', '6b1372b0e231fd45d158e230f9aa9105', 1565139005, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1006, '井野', 'b00d91dde34c3b38ffde59941ccca23e', 1565139036, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1007, '丁次', '0de5b826bd42732af34f55281d53b0e9', 1565139125, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1008, '阿斯玛', 'a606da9f42cedefbe9c4ba7dd901fb99', 1565139154, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1009, '小李', '37233a74aefa8738f5f64a1faa631768', 1565139175, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1010, '天天', '0fe875a8d21ec872f5f27fc2eef04861', 1565139200, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1011, '犬冢牙', '7fcd1938b83dc0f74367eecf640ae141', 1565139219, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1012, '雏田', '96587c217b125aa89f2ec929ffefb241', 1565139308, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1013, '志乃', '07bc9c62055fb34342d5657256703bdc', 1565139335, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1014, '红', '3665a2a6e9784112a79cfd3ebf693388', 1565139376, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1015, '角都', '91ddab30da8a659ac9afae2c2c9e35f0', 1565139400, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1016, '飞段', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1017, '赤砂之蝎', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1018, '迪达拉', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1019, '自来也', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1020, '大蛇丸', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1021, '纲手', NULL, NULL, NULL, 1);
INSERT INTO `oss_logintable` VALUES (1022, '袁飞', NULL, NULL, NULL, 1);

-- ----------------------------
-- Table structure for oss_wagemanagement
-- ----------------------------
DROP TABLE IF EXISTS `oss_wagemanagement`;
CREATE TABLE `oss_wagemanagement`  (
  `id` int(20) NOT NULL,
  `jobNum` int(20) NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `level` int(10) NULL DEFAULT NULL,
  `highTechSub` double(20, 2) NULL DEFAULT NULL,
  `leaveDeductMoney` double(20, 2) NULL DEFAULT NULL,
  `basicMoney` double(20, 2) NULL DEFAULT NULL,
  `houseSub` double(20, 2) NULL DEFAULT NULL,
  `breakRuleDeductMoney` double(20, 2) NULL DEFAULT NULL,
  `overTimeMoney` double(20, 2) NULL DEFAULT NULL,
  `trafficMoney` double(20, 2) NULL DEFAULT NULL,
  `insuranceMoney` double(20, 2) NULL DEFAULT NULL,
  `salary` double(20, 2) NULL DEFAULT NULL,
  `realSalary` double(20, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of oss_wagemanagement
-- ----------------------------
INSERT INTO `oss_wagemanagement` VALUES (1001, 110001, '佐助', 2, 1000.00, 0.00, 4000.00, 1500.00, 0.00, 200.00, 300.00, 2000.00, 6000.00, 5000.00);
INSERT INTO `oss_wagemanagement` VALUES (1002, 110002, '鸣人', 5, 1500.00, 0.00, 5000.00, 1500.00, 0.00, 200.00, 300.00, 3000.00, 9000.00, 7000.00);
INSERT INTO `oss_wagemanagement` VALUES (1003, 110003, '小樱', 3, 1000.00, 0.00, 4500.00, 1500.00, 0.00, 300.00, 300.00, 2500.00, 7500.00, 6000.00);
INSERT INTO `oss_wagemanagement` VALUES (1004, 110004, '卡卡西', 4, 1300.00, 0.00, 4600.00, 1500.00, 0.00, 500.00, 300.00, 2600.00, 8000.00, 6800.00);
INSERT INTO `oss_wagemanagement` VALUES (1005, 110005, '鹿丸', 3, 1000.00, 0.00, 4500.00, 1500.00, 0.00, 400.00, 300.00, 2600.00, 7500.00, 6500.00);
INSERT INTO `oss_wagemanagement` VALUES (1006, 110006, '井野', 2, 1000.00, 0.00, 4000.00, 1500.00, 0.00, 400.00, 300.00, 2000.00, 6000.00, 5300.00);
INSERT INTO `oss_wagemanagement` VALUES (1007, 110007, '丁次', 3, 1200.00, 0.00, 4000.00, 1500.00, 0.00, 200.00, 300.00, 2000.00, 6000.00, 5000.00);
INSERT INTO `oss_wagemanagement` VALUES (1008, 110008, '阿斯玛', 4, 1300.00, 0.00, 4300.00, 1500.00, 0.00, 400.00, 300.00, 2500.00, 7800.00, 6000.00);
INSERT INTO `oss_wagemanagement` VALUES (1009, 110009, '小李', 3, 1200.00, 0.00, 4000.00, 1500.00, 0.00, 400.00, 300.00, 2300.00, 5500.00, 5000.00);
INSERT INTO `oss_wagemanagement` VALUES (1010, 110010, '天天', 3, 1200.00, 0.00, 4000.00, 1500.00, 0.00, 300.00, 300.00, 2300.00, 5300.00, 5000.00);
INSERT INTO `oss_wagemanagement` VALUES (1011, 110011, '宁次', 3, 1400.00, 0.00, 4800.00, 1500.00, 0.00, 700.00, 300.00, 2800.00, 5800.00, 5500.00);
INSERT INTO `oss_wagemanagement` VALUES (1012, 110012, '犬冢牙', 2, 1000.00, 0.00, 4000.00, 1500.00, 0.00, 500.00, 300.00, 2600.00, 5800.00, 5000.00);
INSERT INTO `oss_wagemanagement` VALUES (1013, 110013, '雏田', 2, 1000.00, 0.00, 4000.00, 1500.00, 0.00, 600.00, 300.00, 2500.00, 6000.00, 5300.00);
INSERT INTO `oss_wagemanagement` VALUES (1014, 110014, '志乃', 3, 1200.00, 0.00, 4600.00, 1500.00, 0.00, 400.00, 300.00, 2200.00, 5900.00, 5600.00);
INSERT INTO `oss_wagemanagement` VALUES (1015, 110015, '红', 4, 1600.00, 60.00, 5800.00, 1800.00, 0.00, 0.00, 300.00, 2100.00, 7700.00, 7000.00);
INSERT INTO `oss_wagemanagement` VALUES (1016, 110016, '角都', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1017, 110017, '飞段', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1018, 110018, '赤砂之蝎', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1019, 110019, '迪达拉', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1020, 110020, '自来也', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1021, 110021, '大蛇丸', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1022, 110022, '纲手', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `oss_wagemanagement` VALUES (1023, NULL, '水门', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
