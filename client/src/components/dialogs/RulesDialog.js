import React from 'react';
import {
    Modal,
    Grid,
    ModalOverlay,
    Button,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    GridItem,
  } from '@chakra-ui/react'
import bnb from '../imgs/bnb.svg';
import ftm from '../imgs/ftm.svg';
import polygon from '../imgs/polygon.svg';
import './dialogs.scss';

export function RulesDialog(props) {
    const { connectWallet, onClose, show } = props;
    return (
    <Modal isOpen={show} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Connect your wallet to continue</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div>
          You can mint your plot in one of supported chains.
        </div>
        <div>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <GridItem w='100%' h='100' bg='#f3ba2f'>
              <img src={bnb} className="partner-logo-small"/>
            </GridItem> 
            <GridItem w='100%' h='100' bg='#8247e5'>
              <img src={polygon} className="partner-logo-small"/>
            </GridItem> 
            <GridItem w='100%' h='100' bg='#13b5ec'>
              <img src={ftm} className="partner-logo-small"/>     
            </GridItem>
          </Grid>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={connectWallet}>
          Connect Wallet
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    )
}