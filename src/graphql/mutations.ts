/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createLinks = /* GraphQL */ `mutation CreateLinks(
  $input: CreateLinksInput!
  $condition: ModelLinksConditionInput
) {
  createLinks(input: $input, condition: $condition) {
    id
    url
    date
    isImage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateLinksMutationVariables,
  APITypes.CreateLinksMutation
>;
export const updateLinks = /* GraphQL */ `mutation UpdateLinks(
  $input: UpdateLinksInput!
  $condition: ModelLinksConditionInput
) {
  updateLinks(input: $input, condition: $condition) {
    id
    url
    date
    isImage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateLinksMutationVariables,
  APITypes.UpdateLinksMutation
>;
export const deleteLinks = /* GraphQL */ `mutation DeleteLinks(
  $input: DeleteLinksInput!
  $condition: ModelLinksConditionInput
) {
  deleteLinks(input: $input, condition: $condition) {
    id
    url
    date
    isImage
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteLinksMutationVariables,
  APITypes.DeleteLinksMutation
>;
