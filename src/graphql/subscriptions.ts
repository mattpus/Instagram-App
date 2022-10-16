/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      comment
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      comment
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      comment
      userID
      postID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Post {
        id
        description
        video
        image
        images
        nofComments
        nofLikes
        userID
        User {
          id
          name
          image
          bio
          username
          website
          nofPost
          nofFollowers
          nofFollowing
          Posts {
            nextToken
            startedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      description
      video
      image
      images
      nofComments
      nofLikes
      userID
      User {
        id
        name
        image
        bio
        username
        website
        nofPost
        nofFollowers
        nofFollowing
        Posts {
          items {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Comments {
          items {
            id
            comment
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        Likes {
          items {
            id
            userID
            postID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      image
      bio
      username
      website
      nofPost
      nofFollowers
      nofFollowing
      Posts {
        items {
          id
          description
          video
          image
          images
          nofComments
          nofLikes
          userID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      image
      bio
      username
      website
      nofPost
      nofFollowers
      nofFollowing
      Posts {
        items {
          id
          description
          video
          image
          images
          nofComments
          nofLikes
          userID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      image
      bio
      username
      website
      nofPost
      nofFollowers
      nofFollowing
      Posts {
        items {
          id
          description
          video
          image
          images
          nofComments
          nofLikes
          userID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Comments {
            nextToken
            startedAt
          }
          Likes {
            nextToken
            startedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Comments {
        items {
          id
          comment
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Likes {
        items {
          id
          userID
          postID
          User {
            id
            name
            image
            bio
            username
            website
            nofPost
            nofFollowers
            nofFollowing
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          Post {
            id
            description
            video
            image
            images
            nofComments
            nofLikes
            userID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
