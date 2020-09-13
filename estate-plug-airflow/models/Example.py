from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, PickleType, BigInteger
from models import Base


class ExampleModel(Base):
    """Data model example."""
    __tablename__ = "EXAMPLE_TABLE"
    __table_args__ = {"schema": "estate"}

    id = Column(Integer,
                primary_key=True,
                nullable=False)
    name = Column(String(100),
                  nullable=False)
    description = Column(Text,
                         nullable=True)
    join_date = Column(DateTime,
                       nullable=False)
    vip = Column(Boolean,
                 nullable=False)
    number = Column(Float,
                    nullable=False)
    data = Column(PickleType,
                  nullable=False)
    append_data = Column(PickleType,
                  nullable=False)

    def __repr__(self):
        return '<Example model {}>'.format(self.id)
