-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Table `teachers`.`class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `class` (
  `class_id` INT NOT NULL,
  `Name` VARCHAR(45) NULL DEFAULT NULL,
  `term_id` INT NULL,
  PRIMARY KEY (`class_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `class_has_subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `class_has_subject` (
  `class_class_id` INT NOT NULL,
  `subject_subject_id` INT NOT NULL,
  PRIMARY KEY (`class_class_id`, `subject_subject_id`),
  INDEX `fk_class_has_subject_subject1_idx` (`subject_subject_id` ASC),
  INDEX `fk_class_has_subject_class1_idx` (`class_class_id` ASC),
  CONSTRAINT `fk_class_has_subject_class1`
    FOREIGN KEY (`class_class_id`)
    REFERENCES `class` (`class_id`),
  CONSTRAINT `fk_class_has_subject_subject1`
    FOREIGN KEY (`subject_subject_id`)
    REFERENCES `subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacher` (
  `teacher_id` INT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(60) NULL DEFAULT NULL,
  `password` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `class_has_teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `class_has_teacher` (
  `class_class_id` INT NOT NULL,
  `teacher_teacher_id` INT NOT NULL,
  `is_class_teacher` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`class_class_id`, `teacher_teacher_id`),
  INDEX `fk_class_has_teacher_teacher1_idx` (`teacher_teacher_id` ASC),
  INDEX `fk_class_has_teacher_class_idx` (`class_class_id` ASC),
  CONSTRAINT `fk_class_has_teacher_class`
    FOREIGN KEY (`class_class_id`)
    REFERENCES `class` (`class_id`),
  CONSTRAINT `fk_class_has_teacher_teacher1`
    FOREIGN KEY (`teacher_teacher_id`)
    REFERENCES `teacher` (`teacher_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `subject_has_teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `subject_has_teacher` (
  `subject_subject_id` INT NOT NULL,
  `teacher_teacher_id` INT NOT NULL,
  PRIMARY KEY (`subject_subject_id`, `teacher_teacher_id`),
  INDEX `fk_subject_has_teacher_teacher1_idx` (`teacher_teacher_id` ASC) VISIBLE,
  INDEX `fk_subject_has_teacher_subject1_idx` (`subject_subject_id` ASC) VISIBLE,
  CONSTRAINT `fk_subject_has_teacher_subject1`
    FOREIGN KEY (`subject_subject_id`)
    REFERENCES `subject` (`subject_id`),
  CONSTRAINT `fk_subject_has_teacher_teacher1`
    FOREIGN KEY (`teacher_teacher_id`)
    REFERENCES `teacher` (`teacher_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
