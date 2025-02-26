const typeDefs = `
    type Snapshot {
        id: ID!
        userId: ID
        weight: Float
        height: Float
        bodyFatPercentage: Float
        neck: Float
        waist: Float
        hip: Float
        chest: Float
        leftArm: Float
        rightArm: Float
        leftForearm: Float
        rightForearm: Float
        leftThigh: Float
        rightThigh: Float
        leftCalf: Float
        rightCalf: Float
        date: String
    }

    input SnapshotInput {
        userId: ID!
        weight: Float
        height: Float
        bodyFatPercentage: Float
        neck: Float
        waist: Float
        hip: Float
        chest: Float
        leftArm: Float
        rightArm: Float
        leftForearm: Float
        rightForearm: Float
        leftThigh: Float
        rightThigh: Float
        leftCalf: Float
        rightCalf: Float
        date: String
    }

    type SnapshotResponse {
        message: String!
        statusCode: String!
    }

    type Query {
        getSnapshotById(id: ID!): Snapshot
        getAllSnapshots: [Snapshot]
        getAllSnapshotsUser(userId: ID!): [Snapshot]
    }

    type Mutation {
        createSnapshot(
            userId: ID!,
            weight: Float,
            height: Float,
            bodyFatPercentage: Float,
            neck: Float,
            waist: Float,
            hip: Float,
            chest: Float,
            leftArm: Float,
            rightArm: Float,
            leftForearm: Float,
            rightForearm: Float,
            leftThigh: Float,
            rightThigh: Float,
            leftCalf: Float,
            rightCalf: Float,
            date: String
        ): Snapshot

        updateSnapshot(
            id: ID!,
            weight: Float,
            height: Float,
            bodyFatPercentage: Float,
            neck: Float,
            waist: Float,
            hip: Float,
            chest: Float,
            leftArm: Float,
            rightArm: Float,
            leftForearm: Float,
            rightForearm: Float,
            leftThigh: Float,
            rightThigh: Float,
            leftCalf: Float,
            rightCalf: Float,
            date: String
        ): Snapshot

        deleteSnapshot(id: ID!): SnapshotResponse

    }
`;

module.exports = {
    typeDefs,
  };