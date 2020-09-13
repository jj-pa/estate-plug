from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, PickleType, BigInteger
from models import Base


class CodeAddressModel(Base):
    """법정동 코드 모델"""
    __tablename__ = "TB_CODE_ADDRESS"
    __table_args__ = {"schema": "estate"}

    code = Column(BigInteger,
                primary_key=True,
                nullable=False)
    name = Column(String(100),
                  nullable=False)
    delete_yn = Column(Boolean,
                 nullable=False)
    created_at = Column(DateTime,
                       nullable=False)
    updated_at = Column(DateTime,
                       nullable=False)

    def __repr__(self):
        return '<address code model {}>'.format(self.code)

