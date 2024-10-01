"""empty message

Revision ID: 52af6ac15674
Revises: 13f3603cfdc9
Create Date: 2024-09-29 18:37:57.348128

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52af6ac15674'
down_revision = '13f3603cfdc9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_constraint('product_description_key', type_='unique')
        batch_op.drop_constraint('product_name_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.create_unique_constraint('product_name_key', ['name'])
        batch_op.create_unique_constraint('product_description_key', ['description'])

    # ### end Alembic commands ###
