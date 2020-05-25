import React, { useContext, useEffect } from "react";
import TagContext from "../../context/tag/TagContext";
import AuthContext from "../../context/auth/AuthContext"
import TagItem from "./TagItem";
import { Spinner } from "react-bootstrap";

const SpotTags = () => {
  const tagContext = useContext(TagContext);
  const authContext = useContext(AuthContext)
  const { getTags, tags } = tagContext;
  useEffect(() => {
    authContext.loadUser()
    getTags();
  }, []);

  return (
    <div style={{ fontSize: "17px", textAlign: "center" }}>
      {tags !== null ? (
        tags.map((tag) => <TagItem key={tag._id} tag={tag.tag} tagId={tag._id} />)
      ) : (
          <Spinner animation="border" variant="danger" />
        )}
    </div>
  );
};

export default SpotTags;
