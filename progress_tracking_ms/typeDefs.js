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

    type Response {
        message: String!
        statusCode: Int!
    }

    type Query {
        getSnapshotById(id: ID!): Snapshot
        getAllSnapshots: [Snapshot]
        getAllSnapshotsUser(userId: ID!): [Snapshot]
    }

    type Mutation {
        createSnapshot(
            userId: Long!,
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

        deleteSnapshot(id: ID!): Response
    }
`;

module.exports = {
  typeDefs,
};
