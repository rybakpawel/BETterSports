/*
  Warnings:

  - The primary key for the `ActivateToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ActivateToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `ActivateToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `ActivateToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `ActivateToken` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Athlete` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `personId` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `teamId` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `AthleteToEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AthleteToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `athleteId` on the `AthleteToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `eventId` on the `AthleteToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `AthleteToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `AthleteToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Challenge` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Challenge` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Challenge` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `City` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `countryId` on the `City` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `City` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `City` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Color` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Color` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Color` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Color` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Country` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `facilityId` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `team1Id` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `team2Id` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `sportId` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `winnerId` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Facility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Facility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `locationId` on the `Facility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `standsId` on the `Facility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Facility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Facility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Gadget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Gadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `gadgetTypeId` on the `Gadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `teamId` on the `Gadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Gadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Gadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `GadgetType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `GadgetType` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `GadgetType` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `GadgetType` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `ImageToEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ImageToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `imageId` on the `ImageToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `eventId` on the `ImageToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `ImageToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `ImageToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `ImageToFacility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ImageToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `imageId` on the `ImageToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `facilityId` on the `ImageToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `ImageToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `ImageToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `ImageToGadget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ImageToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `imageId` on the `ImageToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `gadgetId` on the `ImageToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `ImageToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `ImageToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `ImageToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ImageToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `imageId` on the `ImageToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `ImageToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `ImageToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `ImageToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `League` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `League` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `countryId` on the `League` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `sportId` on the `League` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `League` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `League` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cityId` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `moduleId` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Market` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Market` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Market` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Market` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userToFriendId` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `authorId` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Module` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Module` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Module` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Module` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `nationalityId` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Sport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Sport` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Sport` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Sport` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `coachId` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `primaryColorId` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `secondaryColorId` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `logoId` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `leagueId` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `TourGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `TourGroup` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `TourGroup` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `TourGroup` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `personId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `profileImageId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `backgroundImageId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `favouriteTeamId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `cityId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `primaryColorId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `secondaryColorId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `UserToEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `eventId` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `tourGroupId` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `UserToEvent` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `UserToFacility` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `UserToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `facilityId` on the `UserToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `UserToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `UserToFacility` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `UserToFriend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserToFriend` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `invitingUserId` on the `UserToFriend` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `recipentUserId` on the `UserToFriend` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `UserToFriend` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `UserToFriend` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `UserToGadget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `UserToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `UserToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `gadgetId` on the `UserToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `createdById` on the `UserToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedById` on the `UserToGadget` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_personId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "AthleteToEvent" DROP CONSTRAINT "AthleteToEvent_athleteId_fkey";

-- DropForeignKey
ALTER TABLE "AthleteToEvent" DROP CONSTRAINT "AthleteToEvent_createdById_fkey";

-- DropForeignKey
ALTER TABLE "AthleteToEvent" DROP CONSTRAINT "AthleteToEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "AthleteToEvent" DROP CONSTRAINT "AthleteToEvent_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_createdById_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_sportId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_team1Id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_team2Id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_gadgetTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "GadgetType" DROP CONSTRAINT "GadgetType_createdById_fkey";

-- DropForeignKey
ALTER TABLE "GadgetType" DROP CONSTRAINT "GadgetType_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToEvent" DROP CONSTRAINT "ImageToEvent_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToEvent" DROP CONSTRAINT "ImageToEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToEvent" DROP CONSTRAINT "ImageToEvent_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToEvent" DROP CONSTRAINT "ImageToEvent_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToFacility" DROP CONSTRAINT "ImageToFacility_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToFacility" DROP CONSTRAINT "ImageToFacility_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToFacility" DROP CONSTRAINT "ImageToFacility_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToFacility" DROP CONSTRAINT "ImageToFacility_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToGadget" DROP CONSTRAINT "ImageToGadget_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToGadget" DROP CONSTRAINT "ImageToGadget_gadgetId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToGadget" DROP CONSTRAINT "ImageToGadget_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToGadget" DROP CONSTRAINT "ImageToGadget_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToUser" DROP CONSTRAINT "ImageToUser_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToUser" DROP CONSTRAINT "ImageToUser_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImageToUser" DROP CONSTRAINT "ImageToUser_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "ImageToUser" DROP CONSTRAINT "ImageToUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_countryId_fkey";

-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_createdById_fkey";

-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_sportId_fkey";

-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userToFriendId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_nationalityId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_coachId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_logoId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_primaryColorId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_secondaryColorId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_backgroundImageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_createdById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_favouriteTeamId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_personId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_primaryColorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileImageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_secondaryColorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_createdById_fkey";

-- DropForeignKey
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_tourGroupId_fkey";

-- DropForeignKey
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToFacility" DROP CONSTRAINT "UserToFacility_createdById_fkey";

-- DropForeignKey
ALTER TABLE "UserToFacility" DROP CONSTRAINT "UserToFacility_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "UserToFacility" DROP CONSTRAINT "UserToFacility_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "UserToFacility" DROP CONSTRAINT "UserToFacility_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserToFriend" DROP CONSTRAINT "UserToFriend_createdById_fkey";

-- DropForeignKey
ALTER TABLE "UserToFriend" DROP CONSTRAINT "UserToFriend_invitingUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserToFriend" DROP CONSTRAINT "UserToFriend_recipentUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserToFriend" DROP CONSTRAINT "UserToFriend_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "UserToGadget" DROP CONSTRAINT "UserToGadget_createdById_fkey";

-- DropForeignKey
ALTER TABLE "UserToGadget" DROP CONSTRAINT "UserToGadget_gadgetId_fkey";

-- DropForeignKey
ALTER TABLE "UserToGadget" DROP CONSTRAINT "UserToGadget_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "UserToGadget" DROP CONSTRAINT "UserToGadget_userId_fkey";

-- AlterTable
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ActivateToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "personId" SET DATA TYPE INTEGER,
ALTER COLUMN "teamId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AthleteToEvent" DROP CONSTRAINT "AthleteToEvent_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "athleteId" SET DATA TYPE INTEGER,
ALTER COLUMN "eventId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "AthleteToEvent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "countryId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Color" DROP CONSTRAINT "Color_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "facilityId" SET DATA TYPE INTEGER,
ALTER COLUMN "team1Id" SET DATA TYPE INTEGER,
ALTER COLUMN "team2Id" SET DATA TYPE INTEGER,
ALTER COLUMN "sportId" SET DATA TYPE INTEGER,
ALTER COLUMN "winnerId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "locationId" SET DATA TYPE INTEGER,
ALTER COLUMN "standsId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Facility_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Gadget" DROP CONSTRAINT "Gadget_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "gadgetTypeId" SET DATA TYPE INTEGER,
ALTER COLUMN "teamId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Gadget_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GadgetType" DROP CONSTRAINT "GadgetType_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "GadgetType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ImageToEvent" DROP CONSTRAINT "ImageToEvent_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "imageId" SET DATA TYPE INTEGER,
ALTER COLUMN "eventId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ImageToEvent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ImageToFacility" DROP CONSTRAINT "ImageToFacility_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "imageId" SET DATA TYPE INTEGER,
ALTER COLUMN "facilityId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ImageToFacility_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ImageToGadget" DROP CONSTRAINT "ImageToGadget_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "imageId" SET DATA TYPE INTEGER,
ALTER COLUMN "gadgetId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ImageToGadget_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ImageToUser" DROP CONSTRAINT "ImageToUser_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "imageId" SET DATA TYPE INTEGER,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "ImageToUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "League" DROP CONSTRAINT "League_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "countryId" SET DATA TYPE INTEGER,
ALTER COLUMN "sportId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "League_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "cityId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "moduleId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Market" DROP CONSTRAINT "Market_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Market_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Message" DROP CONSTRAINT "Message_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userToFriendId" SET DATA TYPE INTEGER,
ALTER COLUMN "authorId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Module" DROP CONSTRAINT "Module_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Module_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "nationalityId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sport" DROP CONSTRAINT "Sport_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Sport_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "coachId" SET DATA TYPE INTEGER,
ALTER COLUMN "primaryColorId" SET DATA TYPE INTEGER,
ALTER COLUMN "secondaryColorId" SET DATA TYPE INTEGER,
ALTER COLUMN "logoId" SET DATA TYPE INTEGER,
ALTER COLUMN "leagueId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TourGroup" DROP CONSTRAINT "TourGroup_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "TourGroup_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "personId" SET DATA TYPE INTEGER,
ALTER COLUMN "profileImageId" SET DATA TYPE INTEGER,
ALTER COLUMN "backgroundImageId" SET DATA TYPE INTEGER,
ALTER COLUMN "favouriteTeamId" SET DATA TYPE INTEGER,
ALTER COLUMN "cityId" SET DATA TYPE INTEGER,
ALTER COLUMN "primaryColorId" SET DATA TYPE INTEGER,
ALTER COLUMN "secondaryColorId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserToEvent" DROP CONSTRAINT "UserToEvent_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ALTER COLUMN "eventId" SET DATA TYPE INTEGER,
ALTER COLUMN "tourGroupId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "UserToEvent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserToFacility" DROP CONSTRAINT "UserToFacility_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ALTER COLUMN "facilityId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "UserToFacility_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserToFriend" DROP CONSTRAINT "UserToFriend_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "invitingUserId" SET DATA TYPE INTEGER,
ALTER COLUMN "recipentUserId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "UserToFriend_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserToGadget" DROP CONSTRAINT "UserToGadget_pkey",
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "userId" SET DATA TYPE INTEGER,
ALTER COLUMN "gadgetId" SET DATA TYPE INTEGER,
ALTER COLUMN "createdById" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedById" SET DATA TYPE INTEGER,
ADD CONSTRAINT "UserToGadget_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ActivateToken" ADD CONSTRAINT "ActivateToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateToken" ADD CONSTRAINT "ActivateToken_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivateToken" ADD CONSTRAINT "ActivateToken_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteToEvent" ADD CONSTRAINT "AthleteToEvent_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteToEvent" ADD CONSTRAINT "AthleteToEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteToEvent" ADD CONSTRAINT "AthleteToEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleteToEvent" ADD CONSTRAINT "AthleteToEvent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_team1Id_fkey" FOREIGN KEY ("team1Id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_team2Id_fkey" FOREIGN KEY ("team2Id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Athlete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_gadgetTypeId_fkey" FOREIGN KEY ("gadgetTypeId") REFERENCES "GadgetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gadget" ADD CONSTRAINT "Gadget_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadgetType" ADD CONSTRAINT "GadgetType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GadgetType" ADD CONSTRAINT "GadgetType_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToEvent" ADD CONSTRAINT "ImageToEvent_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToEvent" ADD CONSTRAINT "ImageToEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToEvent" ADD CONSTRAINT "ImageToEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToEvent" ADD CONSTRAINT "ImageToEvent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToFacility" ADD CONSTRAINT "ImageToFacility_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToFacility" ADD CONSTRAINT "ImageToFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToFacility" ADD CONSTRAINT "ImageToFacility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToFacility" ADD CONSTRAINT "ImageToFacility_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToGadget" ADD CONSTRAINT "ImageToGadget_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToGadget" ADD CONSTRAINT "ImageToGadget_gadgetId_fkey" FOREIGN KEY ("gadgetId") REFERENCES "Gadget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToGadget" ADD CONSTRAINT "ImageToGadget_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToGadget" ADD CONSTRAINT "ImageToGadget_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToUser" ADD CONSTRAINT "ImageToUser_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToUser" ADD CONSTRAINT "ImageToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToUser" ADD CONSTRAINT "ImageToUser_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageToUser" ADD CONSTRAINT "ImageToUser_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userToFriendId_fkey" FOREIGN KEY ("userToFriendId") REFERENCES "UserToFriend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport" ADD CONSTRAINT "Sport_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sport" ADD CONSTRAINT "Sport_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_primaryColorId_fkey" FOREIGN KEY ("primaryColorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_secondaryColorId_fkey" FOREIGN KEY ("secondaryColorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourGroup" ADD CONSTRAINT "TourGroup_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favouriteTeamId_fkey" FOREIGN KEY ("favouriteTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_primaryColorId_fkey" FOREIGN KEY ("primaryColorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_secondaryColorId_fkey" FOREIGN KEY ("secondaryColorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_tourGroupId_fkey" FOREIGN KEY ("tourGroupId") REFERENCES "TourGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToEvent" ADD CONSTRAINT "UserToEvent_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFacility" ADD CONSTRAINT "UserToFacility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFacility" ADD CONSTRAINT "UserToFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFacility" ADD CONSTRAINT "UserToFacility_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFacility" ADD CONSTRAINT "UserToFacility_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFriend" ADD CONSTRAINT "UserToFriend_invitingUserId_fkey" FOREIGN KEY ("invitingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFriend" ADD CONSTRAINT "UserToFriend_recipentUserId_fkey" FOREIGN KEY ("recipentUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFriend" ADD CONSTRAINT "UserToFriend_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToFriend" ADD CONSTRAINT "UserToFriend_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGadget" ADD CONSTRAINT "UserToGadget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGadget" ADD CONSTRAINT "UserToGadget_gadgetId_fkey" FOREIGN KEY ("gadgetId") REFERENCES "Gadget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGadget" ADD CONSTRAINT "UserToGadget_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGadget" ADD CONSTRAINT "UserToGadget_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
