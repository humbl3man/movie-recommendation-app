import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiPlusCircle as PlusIcon, BiMinusCircle as MinusIcon } from 'react-icons/bi';

import { Content } from '../../typings';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import StarIcon from '../icons/StarIcon.component';
import { StyledCard, StyledRating, StyledCardImageContainer, StyledCardBody, StyledWatchlistButtonContainer } from './ContentCard.styles';
import { useAuth } from '../../state/auth/authProvider';
import { useWatchlistData } from '../../state/watchlist/watchlistProvider';
import { Button } from '../common/Button.component';
import { buttonSizes } from '../common/Button.types';

type ContentCardProps = {
  url: string;
  content: Content;
  showWatchlistButton: boolean;
};

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const { authUser } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistData();
  const [loading, setLoading] = useState(false);
  const [addedToList, setAddedToList] = useState<boolean>(false);
  const showWatchlistButton = Boolean(authUser) && props.showWatchlistButton;

  function handleAddRemove(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setLoading(true);
    if (!addedToList) {
      addToWatchlist(authUser?.uid, props.content.type, props.content, () => {
        setLoading(false);
        setAddedToList(true);
      });
    } else {
      removeFromWatchlist(authUser?.uid, props.content, () => {
        setLoading(false);
        setAddedToList(false);
      });
    }
    return false;
  }

  useEffect(() => {
    if (!authUser) setAddedToList(false);
    if (watchlist.find((item: Content) => item.id === props.content.id)) {
      setAddedToList(true);
    } else {
      setAddedToList(false);
    }
  }, [authUser, watchlist]);

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
      <StyledCard hasImage={Boolean(props.content.poster_path)}>
        <Link to={props.url}>
          {props.content.vote_average > 0 && (
            <StyledRating>
              <StarIcon gold />
              <p className="large">{props.content.vote_average.toFixed(1)}</p>
            </StyledRating>
          )}
          <StyledCardImageContainer>
            <img src={buildImageUrl(props.content.poster_path, { posterSize: 'w500' })} width="500" height="750" alt={props.content.name || props.content.title} />
          </StyledCardImageContainer>
          <StyledCardBody>
            <p>
              {props.content.title && <>{props.content.title}</>}
              {props.content.name && <>{props.content.name}</>}
            </p>
          </StyledCardBody>
        </Link>
        {showWatchlistButton && (
          <StyledWatchlistButtonContainer>
            <Button size={buttonSizes.XSMALL} isLoading={loading} type="button" withIcon onClick={handleAddRemove}>
              {addedToList ? (
                <>
                  <MinusIcon size="25px" /> <span>Remove</span>
                </>
              ) : (
                <>
                  <PlusIcon size="25px" /> <span>Add</span>
                </>
              )}
            </Button>
          </StyledWatchlistButtonContainer>
        )}
      </StyledCard>
    </motion.div>
  );
};

export default ContentCard;
